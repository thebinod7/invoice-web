'use client';

import { INVOICE_STATUS } from '@/app/constants';
import { useIsMobile } from '@/app/hooks/ui/isMobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { SearchX } from 'lucide-react';
import * as React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyMessage?: string;
  showColumnToggle?: boolean;
  showPagination?: boolean;
  onGlobalFilterChange?: (value: string) => void;
  globalFilter?: string;
  totalCount?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  currentPage?: number;
  handleStatusChange?: (status: string) => void;
  clearFilter?: () => void;
  status?: string;
}

export function TanstackTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  isLoading = false,
  loadingComponent,
  emptyMessage = 'No results.',
  showPagination = true,
  onGlobalFilterChange,
  globalFilter,
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  currentPage,
  handleStatusChange,
  clearFilter,
  status,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Remove client-side pagination, and filtering for server-side implementation
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility: {
        invoiceNumber: !isMobile,
        dueDate: isMobile ? false : true,
        grandTotal: isMobile ? false : true,
      },
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter ?? ''}
            onChange={(event) => onGlobalFilterChange?.(event.target.value)}
            className="hidden md:block max-w-sm"
          />
        )}
        {/* Add status filter here */}
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={INVOICE_STATUS.CREATED}>Created</SelectItem>
              <SelectItem value={INVOICE_STATUS.SENT}>Sent</SelectItem>
              <SelectItem value={INVOICE_STATUS.PAID}>Paid</SelectItem>
              <SelectItem value={INVOICE_STATUS.CANCELLED}>
                Cancelled
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {globalFilter || status ? (
          <SearchX
            onClick={clearFilter}
            className="cursor-pointer outline-2 p-2"
            size={36}
          />
        ) : (
          ''
        )}
      </div>
      <div className="w-full overflow-auto rounded-md border">
        <Table className="min-w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loadingComponent || 'Loading...'}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="hidden md:block text-muted-foreground text-sm">
            {totalCount ? (
              <>
                Page {currentPage || 1} - Showing {data.length} of {totalCount}{' '}
                total results
              </>
            ) : (
              `Showing ${data.length} results`
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousPage}
              disabled={!hasPreviousPage || isLoading}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={!hasNextPage || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

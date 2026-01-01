import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { formatCurrency } from '@/app/helpers';

export default function CurrencyDetailsTable({
  currencyChartData,
}: {
  currencyChartData: {
    currency: string;
    total: number;
    unpaid: number;
    overdue: number;
  }[];
}) {
  return (
    <Card className="border border-slate-200 bg-white">
      <CardHeader>
        <CardTitle className="text-slate-900">Currency Details</CardTitle>
        <CardDescription>
          Detailed breakdown of invoiced amounts by currency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Currency
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Total
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Unpaid
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Overdue
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-900">
                  Collection %
                </th>
              </tr>
            </thead>
            <tbody>
              {currencyChartData.length > 0 ? (
                currencyChartData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.currency}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-900 font-semibold">
                      {formatCurrency(row.total, row.currency)}
                    </td>
                    <td className="px-4 py-3 text-right text-amber-600">
                      {formatCurrency(row.unpaid, row.currency)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">
                      {formatCurrency(row.overdue, row.currency)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{
                              width: `${
                                ((row.total - row.unpaid) / row.total) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">
                          {(
                            ((row.total - row.unpaid) / row.total) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

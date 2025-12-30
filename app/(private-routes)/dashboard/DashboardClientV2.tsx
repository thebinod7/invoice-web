'use client';

import type React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CheckCircle2, FileText, Send } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useMyStatsQuery } from '@/app/hooks/backend/user.hook';
import { formatCurrency } from '@/app/helpers';
import { PageSpinner } from '@/ui/PageSpinner';

// Type definitions
interface InvoiceData {
  counts: {
    totalInvoices: number;
    sentInvoices: number;
    paidInvoices: number;
    cancelledInvoices: number;
  };
  amountsByCurrency: {
    [key: string]: {
      total: number;
      unpaid: number;
      overdue: number;
    };
  };
  meta: {
    currencyCount: number;
    excludedStatuses: string[];
    generatedAt: string;
  };
}

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  bgColor: string;
}

export default function DashboardClientV2() {
  const { data } = useMyStatsQuery();

  const invoiceData: InvoiceData = data?.data?.result || null;

  if (!invoiceData) return <PageSpinner />;

  const { amountsByCurrency, counts, meta } = invoiceData;
  const currencyChartData = Object.entries(amountsByCurrency).map(
    ([currency, amounts]) => ({
      currency,
      total: amounts.total,
      unpaid: amounts.unpaid,
      overdue: amounts.overdue,
    })
  );

  const statCards: StatCard[] = [
    {
      title: 'Total Invoices',
      value: counts.totalInvoices,
      description: `${counts.sentInvoices} sent this period`,
      icon: <FileText className="w-5 h-5" />,
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Paid Invoices',
      value: `${counts.paidInvoices}`,
      description: `${
        counts.sentInvoices > 0
          ? ((counts.paidInvoices / counts.sentInvoices) * 100).toFixed(0)
          : 0
      }% paid rate`,
      icon: <CheckCircle2 className="w-5 h-5" />,
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Sent Invoices',
      value: `${counts.sentInvoices}`,
      description: `${
        counts.totalInvoices > 0
          ? ((counts.sentInvoices / counts.totalInvoices) * 100).toFixed(0)
          : 0
      }% of total`,
      icon: <Send className="w-5 h-5" />,
      bgColor: 'from-amber-50 to-orange-50',
    },
  ];

  const invoiceStatusData = [
    { name: 'Paid', value: counts.paidInvoices, fill: '#10b981' },
    {
      name: 'Unpaid',
      value:
        counts.totalInvoices - counts.paidInvoices - counts.cancelledInvoices,
      fill: '#f59e0b',
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => (
          <Card
            key={idx}
            className={`relative overflow-hidden border border-slate-200 bg-gradient-to-br ${stat.bgColor}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription className="text-xs font-medium tracking-wide uppercase text-slate-600">
                    {stat.title}
                  </CardDescription>
                  <CardTitle className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                    {stat.value}
                  </CardTitle>
                </div>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <p className="text-slate-600">{stat.description}</p>
                {stat.trend && (
                  <span className="text-green-600 font-semibold">
                    {stat.trend}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Currency Details Table */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Card className="border border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-slate-900">Currency Details</CardTitle>
            <CardDescription>
              Detailed breakdown of invoiced amounts by currency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
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

        {/* Invoice Status Pie */}
        <Card className="min-w-0 border border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              Invoice Status
            </CardTitle>
            <CardDescription>Payment completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-full">
              <ChartContainer
                config={{
                  paid: { label: 'Paid', color: '#10b981' },
                  unpaid: { label: 'Unpaid', color: '#f59e0b' },
                }}
                className="h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={0}
                      dataKey="value"
                      label={({ name, percent = 0 }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 border-t border-slate-200 pt-6">
        <p>Last updated: {new Date(meta.generatedAt).toLocaleDateString()}</p>
        <p>Excluding: {meta.excludedStatuses.join(', ')} invoices</p>
      </div>
    </div>
  );
}

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
import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '../hooks/ui/isMobile';

export default function InvoiceStatusPieChart({
  invoiceStatusData,
}: {
  invoiceStatusData: { name: string; value: number; fill: string }[];
}) {
  const isMobile = useIsMobile();
  console.log({ isMobile });
  return (
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
                  innerRadius={isMobile ? 40 : 65}
                  outerRadius={isMobile ? 65 : 85}
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
  );
}

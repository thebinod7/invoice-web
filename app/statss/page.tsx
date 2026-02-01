'use client';
import React, { useEffect } from 'react';
import { API_ROUTES } from '../constants/api-routes';
import { API_BASE_URL } from '../helpers/config';
import { getRequest } from '../helpers/request';

export default function page() {
  const [stats, setStats] = React.useState<any>(null);

  useEffect(() => {
    async function fetchStatss() {
      const data = await getRequest(`${API_BASE_URL}${API_ROUTES.APP}/stats`);
      setStats(data?.data.result);
    }

    fetchStatss();
  }, []);

  console.log('STATS', stats);

  return (
    <div className="flex items-center justify-center h-screen">
      {stats ? (
        <div>
          <p>
            Total Users:{' '}
            <span className="font-semibold">{stats?.totalUsers || 0}</span>
          </p>
          <p>
            Total Invoices:{' '}
            <span className="font-semibold">{stats?.totalInvoice || 0}</span>
          </p>
          <div className="mt-4">
            {stats.top5.length > 0
              ? stats.top5.map((d: any, index: number) => {
                  return (
                    <p key={index}>
                      {d.userId} -{' '}
                      <span className="font-bold">{d.invoiceCount}</span>
                    </p>
                  );
                })
              : 'No data...'}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

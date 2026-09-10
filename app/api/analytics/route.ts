import { NextResponse } from 'next/server';

const POSTHOG_PERSONAL_API_KEY = process.env.NEXT_PUBLIC_PERSONAL_API_KEY;
const API_URL_WITH_PROJECT_ID = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_ID;

const PAGE_VIEWS = 330;
const DAU = 600;
const INVOICES = 3800;

export async function GET() {
  try {
    const res = await fetch(
      `${API_URL_WITH_PROJECT_ID}/query/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        },
        body: JSON.stringify({
          query: {
            kind: 'TrendsQuery',
            series: [
              {
                kind: 'EventsNode',
                event: '$pageview',
                name: '$pageview',
                math: 'total',
              },
              {
                kind: 'EventsNode',
                event: '$pageview',
                name: '$pageview',
                math: 'dau',
              },
            ],
            dateRange: { date_from: '-30d' },
            trendsFilter: { display: 'BoldNumber' },
          },
        }),
      }
    );

    const json = await res.json();
    const pageViews = json.results[0]?.aggregated_value;
    const dau = json.results[1]?.aggregated_value;

    // Note: response shape is different — check json.results, not json.result
    const data = {
      pageViews: pageViews + PAGE_VIEWS || PAGE_VIEWS,
      visitors: dau + DAU || DAU,
      invoices: INVOICES,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
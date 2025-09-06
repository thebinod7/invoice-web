import { NextResponse } from 'next/server';

const POSTHOG_PERSONAL_API_KEY = process.env.NEXT_PUBLIC_PERSONAL_API_KEY;
const POSTHOG_API_ENDPOINT = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_ID;

const FULL_API_URL = `${POSTHOG_API_ENDPOINT}/insights/trend/`;

const PV = 320;
const VI = 76;
const INVOICES = 1500;

export async function GET() {
  try {
    const res = await fetch(FULL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      },
      body: JSON.stringify({
        insight: 'TRENDS',
        events: [
          {
            id: '$pageview',
            name: '$pageview',
            type: 'events',
            math: 'total', // total pageviews
          },
          {
            id: '$pageview',
            name: '$pageview',
            type: 'events',
            math: 'dau', // unique visitors
          },
        ],
        date_from: '-30d',
        display: 'BoldNumber',
      }),
    });

    const json = await res.json();

    const data = {
      pageViews: json.result[0]?.aggregated_value + PV || PV,
      visitors: json.result[1]?.aggregated_value + VI || VI,
      invoices: INVOICES,
    };
    return NextResponse.json(data);
  } catch (err) {
    console.log('Error==>', err);
  }
}

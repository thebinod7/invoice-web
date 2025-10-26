'use client';
import React, { useMemo, useState } from 'react';
import { DateTime } from 'luxon';

/**
 * TimezoneConverter - a focused, production-ready React component for Next.js
 *
 * Features:
 * - 3 inputs: source timezone (country/city), source date/time, destination timezone
 * - Searchable dropdowns for timezones (keyboard accessible)
 * - Accurate conversions using Luxon (handles DST and IANA zones)
 * - Validation and user-friendly error messages
 * - Tailwind CSS-ready class names for styling
 *
 * How to use:
 * 1. Install dependency: `npm install luxon`
 * 2. Drop this component into a Next.js page or component tree.
 * 3. Ensure Tailwind (or your CSS) is available for the classes used below, or replace classes.
 *
 * Notes:
 * - For production you might want to replace the in-file timezone list with a curated list
 *   or an API-backed dataset; for many apps a hand-picked list of common zones is sufficient.
 */

type TimezoneOption = {
  label: string;
  value: string; // IANA timezone
  country: string;
  city: string;
};

const TIMEZONE_OPTIONS: TimezoneOption[] = [
  {
    label: 'Kathmandu, Nepal (Asia/Kathmandu)',
    value: 'Asia/Kathmandu',
    country: 'Nepal',
    city: 'Kathmandu',
  },
  {
    label: 'New York, USA (America/New_York)',
    value: 'America/New_York',
    country: 'USA',
    city: 'New York',
  },
  {
    label: 'Los Angeles, USA (America/Los_Angeles)',
    value: 'America/Los_Angeles',
    country: 'USA',
    city: 'Los Angeles',
  },
  {
    label: 'London, UK (Europe/London)',
    value: 'Europe/London',
    country: 'United Kingdom',
    city: 'London',
  },
  {
    label: 'Paris, France (Europe/Paris)',
    value: 'Europe/Paris',
    country: 'France',
    city: 'Paris',
  },
  {
    label: 'Berlin, Germany (Europe/Berlin)',
    value: 'Europe/Berlin',
    country: 'Germany',
    city: 'Berlin',
  },
  {
    label: 'Tokyo, Japan (Asia/Tokyo)',
    value: 'Asia/Tokyo',
    country: 'Japan',
    city: 'Tokyo',
  },
  {
    label: 'Seoul, South Korea (Asia/Seoul)',
    value: 'Asia/Seoul',
    country: 'South Korea',
    city: 'Seoul',
  },
  {
    label: 'Beijing, China (Asia/Shanghai)',
    value: 'Asia/Shanghai',
    country: 'China',
    city: 'Beijing',
  },
  {
    label: 'Mumbai, India (Asia/Kolkata)',
    value: 'Asia/Kolkata',
    country: 'India',
    city: 'Mumbai',
  },
  {
    label: 'Singapore (Asia/Singapore)',
    value: 'Asia/Singapore',
    country: 'Singapore',
    city: 'Singapore',
  },
  {
    label: 'Sydney, Australia (Australia/Sydney)',
    value: 'Australia/Sydney',
    country: 'Australia',
    city: 'Sydney',
  },
  {
    label: 'Dubai, UAE (Asia/Dubai)',
    value: 'Asia/Dubai',
    country: 'UAE',
    city: 'Dubai',
  },
  {
    label: 'Moscow, Russia (Europe/Moscow)',
    value: 'Europe/Moscow',
    country: 'Russia',
    city: 'Moscow',
  },
  {
    label: 'Istanbul, Turkey (Europe/Istanbul)',
    value: 'Europe/Istanbul',
    country: 'Turkey',
    city: 'Istanbul',
  },
  {
    label: 'São Paulo, Brazil (America/Sao_Paulo)',
    value: 'America/Sao_Paulo',
    country: 'Brazil',
    city: 'Sao Paulo',
  },
  {
    label: 'Mexico City, Mexico (America/Mexico_City)',
    value: 'America/Mexico_City',
    country: 'Mexico',
    city: 'Mexico City',
  },
  {
    label: 'Toronto, Canada (America/Toronto)',
    value: 'America/Toronto',
    country: 'Canada',
    city: 'Toronto',
  },
  {
    label: 'Johannesburg, South Africa (Africa/Johannesburg)',
    value: 'Africa/Johannesburg',
    country: 'South Africa',
    city: 'Johannesburg',
  },
  {
    label: 'Hong Kong (Asia/Hong_Kong)',
    value: 'Asia/Hong_Kong',
    country: 'Hong Kong',
    city: 'Hong Kong',
  },
];

function formatZoneDisplay(opt: TimezoneOption) {
  return opt.label;
}

export default function TimezoneConverter({
  initialFrom = 'Asia/Kathmandu',
  initialTo = 'UTC',
}: {
  initialFrom?: string;
  initialTo?: string;
}) {
  const [fromZone, setFromZone] = useState<string>(initialFrom);
  const [toZone, setToZone] = useState<string>(initialTo);
  const [dateTimeISO, setDateTimeISO] = useState<string>(() => {
    // default to current local datetime in ISO for <input type="datetime-local">
    const dt = DateTime.local().toISO({
      suppressMilliseconds: true,
      includeOffset: false,
    });
    // to input datetime-local we need YYYY-MM-DDTHH:mm
    return dt ? dt.slice(0, 16) : '';
  });
  const [queryFrom, setQueryFrom] = useState<string>('');
  const [queryTo, setQueryTo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const filteredFrom = useMemo(() => {
    const q = queryFrom.trim().toLowerCase();
    if (!q) return TIMEZONE_OPTIONS;
    return TIMEZONE_OPTIONS.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.country.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
    );
  }, [queryFrom]);

  const filteredTo = useMemo(() => {
    const q = queryTo.trim().toLowerCase();
    if (!q) return TIMEZONE_OPTIONS;
    return TIMEZONE_OPTIONS.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.country.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
    );
  }, [queryTo]);

  // compute converted time
  const converted = useMemo(() => {
    setError(null);
    if (!dateTimeISO) return null;
    try {
      // Parse the user-entered datetime-local string as if it's in the source zone
      // Example: '2025-10-26T09:30' -> interpreted in fromZone
      const dtFrom = DateTime.fromISO(dateTimeISO, { zone: fromZone });
      if (!dtFrom.isValid) {
        setError('Invalid source date/time');
        return null;
      }
      const dtTo = dtFrom.setZone(toZone);
      return { from: dtFrom, to: dtTo };
    } catch (e) {
      setError('Conversion error');
      return null;
    }
  }, [dateTimeISO, fromZone, toZone]);

  function applyQuickNow() {
    // set date input to "now" in the source zone's local time
    const now = DateTime.now().setZone(fromZone);
    setDateTimeISO(
      now
        .toISO({ suppressMilliseconds: true, includeOffset: false })!
        .slice(0, 16)
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Timezone converter</h2>

      <label className="block mb-2 text-sm font-medium">
        Source timezone (country / city)
      </label>
      <div className="mb-4">
        <input
          aria-label="Search source timezone"
          className="w-full p-2 border rounded mb-2"
          placeholder="Search country or city (e.g. Kathmandu, Nepal)"
          value={queryFrom}
          onChange={(e) => setQueryFrom(e.target.value)}
        />
        <div className="relative">
          <select
            aria-label="Select source timezone"
            className="w-full p-2 border rounded"
            size={5}
            onChange={(e) => setFromZone(e.target.value)}
            value={fromZone}
          >
            {filteredFrom.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {formatZoneDisplay(opt)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="block mb-2 text-sm font-medium">
        Source date & time
      </label>
      <div className="flex gap-2 mb-4">
        <input
          aria-label="Source date and time"
          className="flex-1 p-2 border rounded"
          type="datetime-local"
          value={dateTimeISO}
          onChange={(e) => setDateTimeISO(e.target.value)}
        />
        <button
          type="button"
          className="px-3 py-2 border rounded bg-gray-50"
          onClick={applyQuickNow}
        >
          Now
        </button>
      </div>

      <label className="block mb-2 text-sm font-medium">
        Destination timezone (country / city)
      </label>
      <div className="mb-4">
        <input
          aria-label="Search destination timezone"
          className="w-full p-2 border rounded mb-2"
          placeholder="Search country or city (e.g. London, UK)"
          value={queryTo}
          onChange={(e) => setQueryTo(e.target.value)}
        />
        <div className="relative">
          <select
            aria-label="Select destination timezone"
            className="w-full p-2 border rounded"
            size={5}
            onChange={(e) => setToZone(e.target.value)}
            value={toZone}
          >
            {filteredTo.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {formatZoneDisplay(opt)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Result</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {!dateTimeISO && (
          <div className="text-sm text-gray-600">
            Enter a source date & time.
          </div>
        )}
        {converted && (
          <div className="p-3 border rounded bg-gray-50">
            <div className="mb-1">
              <strong>Source ({fromZone})</strong>:{' '}
              {converted.from.toFormat('yyyy-LL-dd HH:mm (ZZZZ)')}
            </div>
            <div>
              <strong>Destination ({toZone})</strong>:{' '}
              {converted.to.toFormat('yyyy-LL-dd HH:mm (ZZZZ)')}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Offset difference: {converted.to.offset - converted.from.offset}{' '}
              minutes
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-3 py-2 border rounded bg-white"
          onClick={() => {
            // swap zones
            setFromZone((prev) => {
              setToZone(prev);
              return toZone;
            });
          }}
        >
          Swap
        </button>
        <button
          type="button"
          className="px-3 py-2 border rounded bg-blue-600 text-white"
          onClick={() => {
            // copy result to clipboard (friendly fallback)
            if (!converted) return;
            const text = `Source (${fromZone}): ${converted.from.toISO()} -> Destination (${toZone}): ${converted.to.toISO()}`;
            navigator.clipboard?.writeText(text);
          }}
        >
          Copy ISO
        </button>
      </div>
    </div>
  );
}

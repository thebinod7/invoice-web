'use client';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import ReactSelect from '../components/ReactSelect';
import { TIMEZONE_OPTIONS } from '../helpers/timezone';

type TimezoneOption = {
  label: string;
  value: string; // IANA timezone
  country: string;
  city: string;
};

function formatZoneDisplay(opt: TimezoneOption) {
  return opt.label;
}

export default function TimezoneConverter({
  initialFrom = 'America/Chicago',
  initialTo = 'Europe/London',
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

  const [error, setError] = useState<string | null>(null);

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

  console.log('From: ', fromZone);

  return (
    <div className="max-w-xl mt-5 my-5 mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Timezone Converter</h2>

      <label className="block mb-2 text-sm font-medium">Source timezone</label>
      <div className="mb-4">
        <div className="relative">
          <ReactSelect
            handleSelectChange={(d) => setFromZone(d!.value)}
            options={TIMEZONE_OPTIONS}
            instanceId="tz-source"
            placeholder="Search by city (e.g. Chicago)"
          />
          {/* <select
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
          </select> */}
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
        Destination timezone
      </label>
      <div className="mb-4">
        <div className="relative">
          <ReactSelect
            handleSelectChange={(d) => setToZone(d!.value)}
            options={TIMEZONE_OPTIONS}
            instanceId="tz-destination"
            placeholder="Search by city (e.g. London)"
          />
          {/* <select
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
          </select> */}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Result</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {!dateTimeISO && (
          <div className="text-sm text-gray-600">
            Select source date & time.
          </div>
        )}
        {converted && (
          <div className="p-3 border rounded bg-gray-50">
            <div className="mb-1">
              <strong>Source ({fromZone})</strong>:{' '}
              {converted.from.toFormat('yyyy MMMM dd, hh:mm a (ZZZZ)')}
            </div>
            <div>
              <strong>Destination ({toZone})</strong>:{' '}
              {converted.to.toFormat('yyyy MMMM dd, hh:mm a (ZZZZ)')}
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
          className="px-6 py-2 border rounded bg-white"
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
        {/* <button
          type="button"
          className="px-3 py-2 border rounded bg-blue-600 text-white"
          onClick={() => {
            if (!converted) return;
            const text = `Source (${fromZone}): ${converted.from.toISO()} -> Destination (${toZone}): ${converted.to.toISO()}`;
            navigator.clipboard?.writeText(text);
          }}
        >
          Copy ISO
        </button> */}
      </div>
    </div>
  );
}

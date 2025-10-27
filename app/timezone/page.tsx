'use client';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import ReactSelect from '../components/ReactSelect';
import { TIMEZONE_OPTIONS } from '../helpers/timezone';
import { AlertCircle, ArrowRightLeft, Calendar, Clock } from 'lucide-react';

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

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2.5 bg-slate-100 rounded-lg">
            <Clock className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Timezone Converter
          </h1>
        </div>
        <p className="text-sm font-light text-slate-500">
          Convert times across different timezones instantly
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            From Timezone
          </label>
          <ReactSelect
            currentValue={TIMEZONE_OPTIONS.find((o) => o.value === fromZone)}
            handleSelectChange={(d) => setFromZone(d!.value)}
            options={TIMEZONE_OPTIONS}
            instanceId="tz-source"
            placeholder="Search by city (e.g. Chicago)"
          />
        </div>

        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            Date & Time
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="datetime-local"
                value={dateTimeISO}
                onChange={(e) => setDateTimeISO(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm font-light focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-200 hover:border-slate-300"
                aria-label="Source date and time"
              />
            </div>
            <button
              type="button"
              onClick={applyQuickNow}
              className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              Now
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            To Timezone
          </label>
          <ReactSelect
            currentValue={TIMEZONE_OPTIONS.find((o) => o.value === toZone)}
            handleSelectChange={(d) => setToZone(d!.value)}
            options={TIMEZONE_OPTIONS}
            instanceId="tz-destination"
            placeholder="Search by city (e.g. London)"
          />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-light text-red-700">{error}</p>
          </div>
        )}

        {!dateTimeISO && !error && (
          <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-sm font-light text-slate-600">
              Select a date and time to see the conversion
            </p>
          </div>
        )}

        {converted && (
          <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  {fromZone}
                </p>
                <p className="text-lg font-light text-slate-900">
                  {converted.from.toFormat('yyyy MMMM dd, hh:mm a (ZZZZ)')}{' '}
                </p>
              </div>
              <ArrowRightLeft className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
              <div className="flex-1 text-right">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  {toZone}
                </p>
                <p className="text-lg font-light text-slate-900">
                  {converted.to.toFormat('yyyy MMMM dd, hh:mm a (ZZZZ)')}{' '}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={() => {
              setFromZone((prev) => {
                setToZone(prev);
                return toZone;
              });
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50 transition-all duration-200 hover:border-slate-300 active:scale-95"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}

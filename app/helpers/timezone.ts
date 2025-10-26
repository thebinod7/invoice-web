const zones = Intl.supportedValuesOf('timeZone');
const withCities = zones.map((z: any) => {
  if (!z) return { value: '', city: '' };
  const city = z.split('/').pop().replace('_', ' ');
  return { value: z, city };
});

export const TIMEZONE_OPTIONS = withCities.map((z) => ({
  label: z.value,
  value: z.value,
  country: z.value.split('/')[0],
  city: z.city,
}));

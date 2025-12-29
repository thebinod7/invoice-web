import AppWrapper from '../AppWrapper';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppWrapper>{children}</AppWrapper>;
}

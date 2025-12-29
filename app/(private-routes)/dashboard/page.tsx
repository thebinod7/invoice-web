import DashboardClient from './DashboardClient';
import DashboardClientV2 from './DashboardClientV2';

// Generate metadata
export const metadata = {
  title: 'Dashboard - Invomaker',
};

export default function Dashboard() {
  return (
    <>
      <DashboardClientV2 />
    </>
  );
}

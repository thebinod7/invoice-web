import { APP_NAME, APP_PATHS } from '@/app/constants';
import { DASHBOARD_SIDEBAR_ITEMS } from '@/app/constants/api-routes';
import { useAuthContext } from '@/app/context/useAuthContext';
import { ICurrentUser } from '@/app/types';
import { ExternalLink, Flame } from 'lucide-react';
import Link from 'next/link';
import { ProfileDropdown } from './ProfileDropdown';

interface SidebarProps {
  collapsed: boolean;
  pathname: string;
}

export default function Sidebar({ pathname, collapsed }: SidebarProps) {
  const { currentUser } = useAuthContext();
  const activePath = pathname.split('/').pop();

  return (
    <aside
      className={`
        ${collapsed ? 'translate-x-0' : '-translate-x-full'}
        inset-y-0 left-0 z-50
        ${collapsed ? 'w-16' : 'w-80'}
        bg-white border-r border-gray-200
        transition-all duration-200
        flex flex-col
      `}
    >
      {/* Logo */}
      <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-center">
        {!collapsed ? (
          <div className="flex items-center gap-1">
            <h1 className="font-semibold text-lg text-gray-900">{APP_NAME}</h1>
            <Link href="/" target="_blank" title="Go to website">
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <Link href="/" target="_blank" title="Go to website">
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 text-sm space-y-1">
        {DASHBOARD_SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg
                text-gray-700 hover:bg-gray-100 transition
                ${isActive ? 'bg-gray-100' : ''}
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      {/* User Profile */}
      {collapsed ? (
        <Link
          style={{ marginLeft: 8 }}
          className="p-2 text-center"
          href={APP_PATHS.DASHBOARD.SUBSCRIPTION}
        >
          <Flame />
        </Link>
      ) : (
        <Link
          href={APP_PATHS.DASHBOARD.SUBSCRIPTION}
          className="mb-2 font-medium text-sm rounded-lg border border-border p-2 shadow-md"
        >
          Subscribe for more →
        </Link>
      )}
      <ProfileDropdown
        currentUser={currentUser as ICurrentUser | undefined}
        isCollapsed={collapsed}
      />{' '}
    </aside>
  );
}

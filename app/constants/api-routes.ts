import {
  ChartNoAxesColumn,
  FileStack,
  Lightbulb,
  LucideIcon,
  Plus,
  Shield,
  Users,
} from 'lucide-react';
import { APP_PATHS } from '.';

export const API_ROUTES = {
  APP: '/app',
  AUTH: '/auth',
  GENERATE_INVOICE: '/app/generate-invoice',
  INVOICE_CLIENTS: '/invoice-clients',
  INVOICES: '/invoices',
  SUBSCRIPTIONS: '/subscriptions',
  USERS: '/users',
  PROMPTS: '/prompts',
};

interface SidebarItemConfig {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  isNew?: boolean;
}

interface AdminSidebarChildConfig {
  key: string;
  label: string;
  href?: string;
  disabled?: boolean;
}

interface AdminSidebarGroupConfig {
  key: string;
  label: string;
  icon: LucideIcon;
  children: AdminSidebarChildConfig[];
}

export const DASHBOARD_SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: APP_PATHS.DASHBOARD.HOME,
    icon: ChartNoAxesColumn,
  },
  {
    key: 'new-invoice',
    label: 'New Invoice',
    href: APP_PATHS.CREATE_INVOICE,
    icon: Plus,
  },
  {
    key: 'my-invoices',
    label: 'My Invoices',
    href: APP_PATHS.DASHBOARD.INVOICES,
    icon: FileStack,
  },
  {
    key: 'clients',
    label: 'My Clients',
    href: APP_PATHS.DASHBOARD.CLIENTS,
    icon: Users,
    isNew: true,
  },
  {
    key: 'feedback',
    label: 'Feedback',
    href: APP_PATHS.DASHBOARD.FEEDBACK,
    icon: Lightbulb,
  },
];

export const ADMIN_SIDEBAR_GROUP: AdminSidebarGroupConfig = {
  key: 'admin',
  label: 'Admin',
  icon: Shield,
  children: [
    {
      key: 'batman',
      label: 'Paid Users',
      href: APP_PATHS.DASHBOARD.BATMAN,
    },
    {
      key: 'logs',
      label: 'Logs',
      disabled: true,
    },
  ],
};

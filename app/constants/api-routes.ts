import {
  ChartNoAxesColumn,
  FileStack,
  Lightbulb,
  LucideIcon,
  Plus,
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
    key: 'invoices',
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

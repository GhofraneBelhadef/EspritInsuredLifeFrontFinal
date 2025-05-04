import { RouteInfo } from '../sidebar/sidebar.metadata';

export const ROUTES_ADMIN: RouteInfo[] = [
  {
    path: '/component/alert',
    title: 'Risk Management',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/badges',
    title: 'Loan Management',
    icon: 'bi bi-bar-chart',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboardadmin/parametres',
    title: 'Contract Manegement',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboardadmin/logs',
    title: 'Claim Management',
    icon: 'bi bi-clipboard-data',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboardadmin/support',
    title: 'Donation Management',
    icon: 'bi bi-life-preserver',
    class: '',
    extralink: false,
    submenu: []
  }
];

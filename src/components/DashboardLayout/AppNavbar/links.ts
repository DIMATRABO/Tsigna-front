// import { Link } from 'components/shared/types';
import {
  IconUser,
  IconLayoutDashboard,
  IconWallet,
  IconBulb,
} from "@tabler/icons-react";
import { Link } from "types/link";
// import { UserRole } from 'features/Dashboard/Users/utils/model';

export const links: Array<Link> = [
  {
    icon: IconLayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
    roles: ["user"],
  },
  {
    label: "Wallet",
    icon: IconWallet,
    path: "/wallet",
    roles: ["user"],
  },
  {
    label: "Strategies",
    icon: IconBulb,
    path: "/strategies",
    roles: ["user"],
  },
  {
    label: "Users",
    icon: IconUser,
    path: "/users",
    roles: ["genin"],
  },
  {
    label: "Strategies",
    icon: IconBulb,
    path: "/adminStrategies",
    roles: ["genin"],
  },
];

// export const links: Array<Link> = [
//   {
//     icon: IconLayoutDashboard,
//     label: 'Centers',
//     path: '/dashboard/centers',
//     roles: [UserRole.ADMIN],
//   },
//   {
//     icon: IconLayoutDashboard,
//     label: 'Center',
//     path: '/dashboard/centers',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconUser,
//     label: 'Users',
//     path: '/dashboard/users',
//     roles: [UserRole.ADMIN],
//   },
//   {
//     icon: IconUser,
//     label: 'Staff',
//     path: '/dashboard/staff',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconMan,
//     label: 'Parents',
//     path: '/dashboard/parents',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconMoodKid,
//     label: 'Children',
//     path: '/dashboard/children',
//     roles: [UserRole.ADMIN, UserRole.STAFF],
//   },
//   {
//     icon: IconUsers,
//     label: 'Groups',
//     path: '/dashboard/groups',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconSpeakerphone,
//     label: 'Announcements',
//     path: '/dashboard/announcements',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconShoppingBag,
//     label: 'Supply Requests',
//     path: '/dashboard/supply-requests',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconFileInvoice,
//     label: 'Invoices',
//     path: '/dashboard/invoices',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconFiles,
//     label: 'Documents',
//     path: '/dashboard/documents',
//     roles: [UserRole.STAFF],
//   },
//   {
//     icon: IconReport,
//     label: 'Reports',
//     roles: [UserRole.STAFF],
//     links: [
//       {
//         icon: IconMoodKid,
//         label: 'Students Reports',
//         path: '/dashboard/student-reports',
//         roles: [UserRole.STAFF],
//       },
//       {
//         icon: IconUsers,
//         label: 'Groups Reports',
//         path: '/dashboard/groups-reports',
//         roles: [UserRole.STAFF],
//       },
//       {
//         icon: IconUser,
//         label: 'Staff Reports',
//         path: '/dashboard/staff-reports',
//         roles: [UserRole.STAFF],
//       },
//       {
//         icon: IconReportMoney,
//         label: 'Billing Reports',
//         path: '/dashboard/billing-reports',
//         roles: [UserRole.STAFF],
//       },
//     ],
//   },
//   {
//     icon: IconCategory,
//     label: 'Categories',
//     roles: [UserRole.STAFF],
//     links: [
//       {
//         icon: IconUsers,
//         label: 'Group Categories',
//         path: '/dashboard/group-categories',
//         roles: [UserRole.STAFF],
//       },
//       {
//         icon: IconShoppingBag,
//         label: 'Supply Categories',
//         path: '/dashboard/supply-categories',
//         roles: [UserRole.STAFF],
//       },
//     ],
//   },
// ];

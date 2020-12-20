import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Control',
    icon: 'settings-outline',
    children: [
      {
        title: 'Devices',
        icon: 'hard-drive-outline',
        link: '/pages/control/devices',
      },
      {
        title: 'Status cards',
        icon: 'archive-outline',
        children: [
          {
          title: 'On/Off cards',
          icon: 'credit-card-outline',
          link: '/pages/control/statusCards/onOffCards',
          },
        ],
      },
    ],
  },
];

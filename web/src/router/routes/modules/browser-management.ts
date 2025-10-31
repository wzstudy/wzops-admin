import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const browserManagement: AppRouteModule = {
  path: '/browser-management',
  name: 'BrowserManagement',
  component: LAYOUT,
  redirect: '/browser-management/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:bitbrowser',
    title: t('routes.browser.management'),
    orderNo: 100001,
  },
  children: [
    {
      path: 'index',
      name: 'BrowserManagementPage',
      component: () => import('/@/views/browser-management/index.vue'),
      meta: {
        title: t('routes.browser.management'),
        icon: 'simple-icons:bitbrowser',
        hideMenu: true,
      },
    },
  ],
};

export default browserManagement;
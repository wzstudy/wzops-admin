import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const proxyPool: AppRouteModule = {
  path: '/proxy-pool',
  name: 'ProxyPool',
  component: LAYOUT,
  redirect: '/proxy-pool/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:cloud-server-outlined',
    title: t('routes.proxy-pool.proxyPool'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'ProxyPoolPage',
      component: () => import('/@/views/proxy-pool/index.vue'),
      meta: {
        title: t('routes.proxy-pool.proxyPool'),
        icon: 'ant-design:cloud-server-outlined',
        hideMenu: true,
      },
    },
  ],
};

export default proxyPool;
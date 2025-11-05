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
    title: '代理IP池管理',
    orderNo: 100002,
  },
  children: [
    {
      path: 'index',
      name: 'ProxyPoolPage',
      component: () => import('/@/views/proxy-pool/index.vue'),
      meta: {
        title: '代理IP池管理',
        icon: 'ant-design:cloud-server-outlined',
        hideMenu: true,
      },
    },
  ],
};

export default proxyPool;
import { defHttp } from '/@/utils/http/axios';

enum Api {
  prefix = '/api/proxy/ips',
}

export interface ProxyIP {
  id: string;
  ip_address: string;
  port: number;
  protocol: 'HTTP' | 'HTTPS';
  location: string;
  latency: number;
  last_verified: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProxyIPListParams {
  page: number;
  size: number;
  ip_address?: string;
  location?: string;
  is_active?: boolean;
  search?: string;
}

export interface ProxyIPFormParams {
  ip_address: string;
  port: number;
  protocol: 'HTTP' | 'HTTPS';
  location?: string;
}

export const getProxyIPList = (params: ProxyIPListParams) => {
  return defHttp.get<{ items: ProxyIP[]; total: number }>({
    url: Api.prefix,
    params,
  });
};

export const createProxyIP = (params: ProxyIPFormParams) => {
  return defHttp.post<ProxyIP>({
    url: Api.prefix,
    params,
  });
};

export const updateProxyIP = (id: string, params: ProxyIPFormParams) => {
  return defHttp.put<ProxyIP>({
    url: `${Api.prefix}/${id}`,
    params,
  });
};

export const deleteProxyIP = (id: string) => {
  return defHttp.delete<boolean>({
    url: `${Api.prefix}/${id}`,
  });
};

export const validateProxyIPs = (ip_ids: string[]) => {
  return defHttp.post<boolean>({
    url: `${Api.prefix}/validate-batch`,
    params: { ip_ids },
  });
};
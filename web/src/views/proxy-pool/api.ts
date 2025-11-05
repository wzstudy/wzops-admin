import { defHttp } from '/@/utils/http/axios';

enum Api {
  PROXY_IP_LIST = '/proxy/ips',
  CREATE_PROXY_IP = '/proxy/ips',
  UPDATE_PROXY_IP = '/proxy/ips/',
  DELETE_PROXY_IP = '/proxy/ips/',
  VALIDATE_PROXY_IPS = '/proxy/ips/validate-batch',
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
    url: Api.PROXY_IP_LIST,
    params,
  });
};

export const createProxyIP = (params: ProxyIPFormParams) => {
  return defHttp.post<ProxyIP>({
    url: Api.CREATE_PROXY_IP,
    params,
  });
};

export const updateProxyIP = (id: string, params: ProxyIPFormParams) => {
  return defHttp.put<ProxyIP>({
    url: `${Api.UPDATE_PROXY_IP}${id}`,
    params,
  });
};

export const deleteProxyIP = (id: string) => {
  return defHttp.delete<boolean>({
    url: `${Api.DELETE_PROXY_IP}${id}`,
  });
};

export const validateProxyIPs = (ip_ids: string[]) => {
  return defHttp.post<boolean>({
    url: Api.VALIDATE_PROXY_IPS,
    params: { ip_ids },
  });
};
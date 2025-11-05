import { defHttp } from '/@/utils/http/axios';

enum ProxyPoolApi {
  prefix = '/api/proxy/proxy-ips',
}

/**
 * 获取代理IP列表
 */
export const getList = (params: any) => {
  return defHttp.get({
    url: ProxyPoolApi.prefix,
    params,
  });
};

/**
 * 保存或更新代理IP
 */
export const createOrUpdate = (params: any, isUpdate: boolean) => {
  if (isUpdate) {
    return defHttp.put({
      url: `${ProxyPoolApi.prefix}/${params.id}`,
      params,
    });
  } else {
    return defHttp.post({
      url: ProxyPoolApi.prefix,
      params,
    });
  }
};

/**
 * 删除代理IP
 */
export const deleteItem = (id: number) => {
  return defHttp.delete({
    url: `${ProxyPoolApi.prefix}/${id}`,
  });
};

/**
 * 批量验证代理IP
 */
export const validateBatch = (ids: number[]) => {
  return defHttp.post({
    url: `${ProxyPoolApi.prefix}/validate-batch`,
    params: { ids },
  });
};
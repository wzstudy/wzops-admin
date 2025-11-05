/**
 * -*- coding: utf-8 -*-
 * time: 2023/10/10 10:00
 * author: AI Assistant
 */
import { defHttp } from '/@/utils/http/axios';

enum BrowserApi {
  prefix = '/api/browser/windows',
}
/**
 * 获取浏览器窗口列表
 */
export const getWindowList = (params) => {
  return defHttp.get({ url: BrowserApi.prefix, params });
};

/**
 * 保存或更新浏览器窗口
 */
export const createOrUpdateWindow = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.put({ url: BrowserApi.prefix + '/' + params.id, params });
  } else {
    return defHttp.post({ url: BrowserApi.prefix, params });
  }
};

/**
 * 删除浏览器窗口
 */
export const deleteWindow = (id) => {
  return defHttp.delete({ url: BrowserApi.prefix + '/' + id });
};
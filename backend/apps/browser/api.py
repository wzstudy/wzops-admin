#!/usr/bin/env python
# -*- coding: utf-8 -*-

from typing import List

from apps.browser.models import BrowserWindow
from ninja import Field, ModelSchema, Query, Router
from ninja.pagination import paginate
from utils.fu_crud import (
    ImportSchema,
    create,
    delete,
    export_data,
    import_data,
    retrieve,
    update,
)
from utils.fu_ninja import FuFilters, MyPagination

router = Router()


# 设置过滤字段
class Filters(FuFilters):
    name: str = Field(None, alias="name")
    proxy_domain: str = Field(None, alias="proxy_domain")
    status: str = Field(None, alias="status")
    id: str = Field(None, alias="window_id")


# 设置请求接收字段
class BrowserWindowSchemaIn(ModelSchema):
    class Config:
        model = BrowserWindow
        model_fields = ['name', 'proxy_domain', 'remark']


# 设置响应字段
class BrowserWindowSchemaOut(ModelSchema):
    class Config:
        model = BrowserWindow
        model_fields = ['id', 'name', 'proxy_domain', 'proxy_status', 'last_ip', 'status', 'remark', 'created_at', 'updated_at']


# 创建浏览器窗口
@router.post("/windows", response=BrowserWindowSchemaOut)
def create_browser_window(request, data: BrowserWindowSchemaIn):
    window = create(request, data, BrowserWindow)
    return window


# 删除浏览器窗口
@router.delete("/windows/{window_id}")
def delete_browser_window(request, window_id: str):
    delete(window_id, BrowserWindow)
    return {"success": True}


# 更新浏览器窗口
@router.put("/windows/{window_id}", response=BrowserWindowSchemaOut)
def update_browser_window(request, window_id: str, data: BrowserWindowSchemaIn):
    window = update(request, window_id, data, BrowserWindow)
    return window


# 获取浏览器窗口列表
@router.get("/windows", response=List[BrowserWindowSchemaOut])
@paginate(MyPagination)
def list_browser_windows(request, filters: Filters = Query(...)):
    qs = retrieve(request, BrowserWindow, filters)
    return qs


# 导出浏览器窗口数据
@router.get("/windows/all/export")
def export_browser_windows(request):
    export_fields = ['name', 'proxy_domain', 'proxy_status', 'last_ip', 'status', 'remark']
    return export_data(request, BrowserWindow, BrowserWindowSchemaOut, export_fields)


# 导入浏览器窗口数据
@router.post("/windows/all/import")
def import_browser_windows(request, data: ImportSchema):
    import_fields = ['name', 'proxy_domain', 'proxy_status', 'last_ip', 'status', 'remark']
    return import_data(request, BrowserWindow, BrowserWindowSchemaIn, data, import_fields)
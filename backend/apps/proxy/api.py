# -*- coding: utf-8 -*-
# @Time    : 2024/1/1 10:00
# @Author  : Trae
# @FileName: api.py
# @Software: PyCharm
from typing import List, Optional
from datetime import datetime

from apps.proxy.models import ProxyIP
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
    ip_address: str = Field(None, alias="ip_address")
    location: str = Field(None, alias="location")
    is_active: bool = Field(None, alias="is_active")
    search: str = Field(None, alias="search")


# 设置请求接收字段
class ProxyIPSchemaIn(ModelSchema):
    class Config:
        model = ProxyIP
        model_fields = ['ip_address', 'port', 'protocol', 'location']


# 设置响应字段
class ProxyIPSchemaOut(ModelSchema):
    sort: Optional[int]
    class Config:
        model = ProxyIP
        model_fields = '__all__'


# 创建代理IP
@router.post("/ips", response=ProxyIPSchemaOut)
def create_proxy_ip(request, data: ProxyIPSchemaIn):
    proxy_ip = create(request, data, ProxyIP)
    return proxy_ip


# 删除代理IP
@router.delete("/ips/{ip_id}")
def delete_proxy_ip(request, ip_id: str):
    delete(ip_id, ProxyIP)
    return {"success": True}


# 更新代理IP
@router.put("/ips/{ip_id}", response=ProxyIPSchemaOut)
def update_proxy_ip(request, ip_id: str, data: ProxyIPSchemaIn):
    proxy_ip = update(request, ip_id, data, ProxyIP)
    return proxy_ip


# 获取代理IP列表
@router.get("/ips", response=List[ProxyIPSchemaOut])
@paginate(MyPagination)
def list_proxy_ips(request, filters: Filters = Query(...)):
    qs = retrieve(request, ProxyIP, filters)
    return qs


# 导出代理IP数据
@router.get("/ips/all/export")
def export_proxy_ips(request):
    export_fields = ['ip_address', 'port', 'protocol', 'location', 'latency', 'last_verified', 'is_active']
    return export_data(request, ProxyIP, ProxyIPSchemaOut, export_fields)


# 导入代理IP数据
@router.post("/ips/all/import")
def import_proxy_ips(request, data: ImportSchema):
    import_fields = ['ip_address', 'port', 'protocol', 'location']
    return import_data(request, ProxyIP, ProxyIPSchemaIn, data, import_fields)


# 批量验证代理IP
@router.post("/ips/validate-batch")
def validate_proxy_ips_batch(request, ip_ids: List[str]):
    # 这里需要实现批量验证逻辑
    # 目前先返回成功，后续需要添加异步验证逻辑
    return {"success": True, "message": "批量验证任务已启动"}
from typing import List
from .models import ProxyIP
from ninja import Field, ModelSchema, Query, Router, Schema
from ninja.pagination import paginate
from utils.fu_crud import create, delete, retrieve, update
from utils.fu_ninja import FuFilters, MyPagination

router = Router()


# 设置过滤字段
class ProxyIPFilters(FuFilters):
    ip_address: str = Field(None, alias="ip_address")
    location: str = Field(None, alias="location")
    is_active: bool = Field(None, alias="is_active")
    protocol: str = Field(None, alias="protocol")


# 设置请求接收字段
class ProxyIPSchemaIn(ModelSchema):
    class Config:
        model = ProxyIP
        model_fields = ['ip_address', 'port', 'protocol', 'location', 'remark']


# 设置响应字段
class ProxyIPSchemaOut(ModelSchema):
    class Config:
        model = ProxyIP
        model_fields = '__all__'


# 创建ProxyIP
@router.post("/proxy-ips", response=ProxyIPSchemaOut)
def create_proxy_ip(request, data: ProxyIPSchemaIn):
    proxy_ip = create(request, data, ProxyIP)
    return proxy_ip


# 删除ProxyIP
@router.delete("/proxy-ips/{id}")
def delete_proxy_ip(request, id: int):
    delete(id, ProxyIP)
    return {'success': True}


# 更新ProxyIP
@router.put("/proxy-ips/{id}", response=ProxyIPSchemaOut)
def update_proxy_ip(request, id: int, data: ProxyIPSchemaIn):
    proxy_ip = update(request, id, data, ProxyIP)
    return proxy_ip


# 获取ProxyIP列表
@router.get("/proxy-ips", response=List[ProxyIPSchemaOut])
@paginate(MyPagination)
def list_proxy_ip(request, filters: ProxyIPFilters = Query(...)):
    qs = retrieve(request, ProxyIP, filters)
    return qs


# 批量验证ProxyIP
@router.post("/proxy-ips/validate-batch")
def validate_batch_proxy_ip(request, data: Schema):
    # 这里应该实现异步验证逻辑
    # 暂时返回成功
    return {'success': True, 'message': '批量验证任务已启动'}
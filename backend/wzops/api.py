# -*- coding: utf-8 -*-
# @Time    : 2022/5/9 23:15
# @Author  : 臧成龙
# @FileName: api.py
# @Software: PyCharm
from apps.demo.router import demo_router
from apps.browser.router import browser_router
from apps.proxy.router import router as proxy_router
from system.router import system_router
from utils.fu_auth import GlobalAuth
from utils.fu_ninja import FuNinjaAPI
from generator.router import generator_router


api = FuNinjaAPI(auth=GlobalAuth())


# 统一处理server异常
@api.exception_handler(Exception)
def a(request, exc):

    if hasattr(exc, 'errno'):
        return api.create_response(request, data=[], msg=str(exc), code=exc.errno)
    else:
        return api.create_response(request, data=[], msg=str(exc), code=500)


api.add_router('/system/', system_router)
api.add_router('/demo/', demo_router)
api.add_router('/generator/', generator_router)
api.add_router('/browser/', browser_router)
api.add_router('/proxy/', proxy_router)

# -*- coding: utf-8 -*-
# @Time    : 2024/1/1 10:00
# @Author  : Trae
# @FileName: router.py
# @Software: PyCharm
from ninja import Router
from apps.proxy.api import router

proxy_router = Router()
proxy_router.add_router('/', router, tags=["Proxy IP Management"])
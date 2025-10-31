#!/usr/bin/env python
# -*- coding: utf-8 -*-

from ninja import Router
from apps.browser.api import router

browser_router = Router()
browser_router.add_router('/', router, tags=["Browser Management"])
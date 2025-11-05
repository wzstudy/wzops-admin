from ninja import Router
from .api import router as proxy_api_router

router = Router()
router.add_router("/", proxy_api_router, tags=["代理IP池管理"])
from django.db import models
from utils.models import CoreModel

class ProxyIP(CoreModel):
    """代理IP模型"""
    ip_address = models.GenericIPAddressField(unique=True, verbose_name="IP地址")
    port = models.PositiveIntegerField(verbose_name="端口")
    protocol = models.CharField(max_length=10, choices=[('HTTP', 'HTTP'), ('HTTPS', 'HTTPS')], default='HTTP', verbose_name="协议")
    location = models.CharField(max_length=100, blank=True, null=True, verbose_name="地理位置")
    latency = models.FloatField(blank=True, null=True, verbose_name="延迟(ms)")
    last_verified = models.DateTimeField(blank=True, null=True, verbose_name="最后验证时间")
    is_active = models.BooleanField(default=True, verbose_name="是否可用")
    remark = models.TextField(blank=True, null=True, verbose_name="备注")
    
    class Meta:
        db_table = "proxy_ip"
        verbose_name = "代理IP"
        verbose_name_plural = "代理IP池"
        ordering = ['-create_datetime']
    
    def __str__(self):
        return f"{self.protocol}://{self.ip_address}:{self.port}"
# -*- coding: utf-8 -*-
# @Time    : 2024/1/1 10:00
# @Author  : Trae
# @FileName: models.py
# @Software: PyCharm
from django.db import models
from utils.models import CoreModel


class ProxyIP(CoreModel):
    """代理IP模型"""
    ip_address = models.CharField(max_length=15, verbose_name="IP地址", unique=True, help_text="IP地址，格式：xxx.xxx.xxx.xxx")
    port = models.IntegerField(verbose_name="端口", help_text="端口号，范围：1-65535")
    protocol = models.CharField(max_length=10, verbose_name="协议类型", choices=(('HTTP', 'HTTP'), ('HTTPS', 'HTTPS')), default='HTTP', help_text="协议类型，HTTP或HTTPS")
    location = models.CharField(max_length=100, verbose_name="地理位置", blank=True, null=True, help_text="地理位置描述")
    latency = models.IntegerField(verbose_name="延迟(ms)", blank=True, null=True, help_text="延迟，单位：毫秒")
    last_verified = models.DateTimeField(verbose_name="最后验证时间", blank=True, null=True, help_text="最后验证时间")
    is_active = models.BooleanField(verbose_name="是否可用", default=True, help_text="是否可用")

    class Meta:
        db_table = "proxy_ip"
        verbose_name = "代理IP"
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.protocol}://{self.ip_address}:{self.port}"
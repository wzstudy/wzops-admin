from django.db import models
from django.utils import timezone

class BrowserWindow(models.Model):
    """浏览器窗口模型"""
    id = models.CharField(max_length=100, primary_key=True, verbose_name="窗口ID")
    name = models.CharField(max_length=200, verbose_name="窗口名称")
    proxy_domain = models.CharField(max_length=200, blank=True, null=True, verbose_name="代理域名")
    proxy_status = models.BooleanField(default=False, verbose_name="代理状态")
    last_ip = models.CharField(max_length=100, blank=True, null=True, verbose_name="最后已知IP")
    status = models.CharField(max_length=20, choices=[('online', '在线'), ('offline', '离线')], default='offline', verbose_name="状态")
    remark = models.TextField(blank=True, null=True, verbose_name="备注信息")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")
    
    class Meta:
        verbose_name = "浏览器窗口"
        verbose_name_plural = "浏览器窗口"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name

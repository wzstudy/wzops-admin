# Docker构建

参考[django-vue-admin](https://gitee.com/liqianglog/django-vue-admin)项目的docker构建

## docker compose

在项目更目录下，执行`docker-compose up -d` 或 `docker compose up -d`

## 第一次运行

进入django容器输出化数据库`docker-compose exec fuadmin-django bash`

```sh
python manage.py makemigrations system demo
python manage.py migrate
python manage.py init
python manage.py init_area
```

## 服务端口

- web: 8080
- api: 8000
- redis: 63790
- mysql: 33060

## MySQL存储

为了不污染本地开发环境，MySQL使用docker的Volume进行存储。

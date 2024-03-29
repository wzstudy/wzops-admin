
create database fuadmin default character set utf8mb4 collate utf8mb4_unicode_ci;

# 知识点

- 路由是由back控制，不是.

# 待解决问题

## loginlog信息 缺乏 contry, city等信息
   目前是访问 https://ip.django-vue-admin.com/ip/analysis实现，当下是先屏蔽。

## 部门可以选择作为父部门，也可以选择子部门为父部门
## 部门负责人在新建部门的时候，没有选择父部门，导致部门没有父部门，需要修改为[父部门必选] [完成 0326]
## 部门负责人在新建员工的时候，没有选择父部门，导致员工没有父部门，需要修改为[父部门必选] [完成 0326

## 数字资源申报中“应支持文本文档（包括文字、图片混合文档）直接上传转录及编辑修改功能。” 如何处理？



# 源码修改


# 部门权限相关

## 增加白名单
'/api/system/dept/list/tree','/api/system/dict_item/by/code', '/api/system/post/all/list',
              '/api/system/role/all/list'

## Dept
  把 belong_dept 设置为id

## User
   把 belong_dept 设置为dept_id

## fu_crud.py  增加  方法

 ```
 def retrieveNoFilter(model):
    return model.objects.all()
 ```

## role.py

```
@router.get("/role/all/list", response=List[SchemaOut])
def all_list_role(request):
    qs = retrieveNoFilter(Role)  --> 原来是  qs = retrieve(request, Role)
    return qs
```

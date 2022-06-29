"""opengauss URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import imp
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
# from django.urls import re_path as url
from django.conf.urls import url
from kangyuan import views
from django.conf import settings


urlpatterns = [
    url(r'^Login',views.Loginview.as_view()), #登录界面
    url(r'^Reg',views.Regview.as_view()), #新建学生用户
    url(r'^SearchAll',views.SelectAllStu.as_view()), #查询所有学生    
    url(r'^QueryStu',views.QueryStu.as_view()), #按条件查询学生
    url(r'^Setlz',views.Setlouzhang.as_view()), #设置学生为楼长
    url(r'^UnSetlz',views.Unsetlouzhang.as_view()), #取消学生为楼长
    url(r'^UploadD',views.UploadDetection.as_view()), #学生上传抗原信息
    url(r'^StuHis',views.StuHistory.as_view()), #学生页面上传历史
    url(r'^StuUnrepo',views.STUTodayUnRepo.as_view()), #未上报学生名单
    url(r'^TeRe',views.TeRepo.as_view()), #教师查看上报学生名单
    url(r'^TeUnRe',views.TeUnRe.as_view()), #教师查看未上报学生名单
    url(r'^DeleStu',views.DeleStu.as_view()), #教师删除学生信息
    url('Upload/',views.UpLoadImg) #抗原照片上传
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


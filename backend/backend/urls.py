"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
# from django.urls import re_path as url
from django.conf.urls import url
from shuCovid import views
from django.conf import settings



urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^Login',views.Loginview.as_view()),
    url(r'^Reg',views.Regview.as_view()),
    url(r'^SearchAll',views.SelectAllStu.as_view()),
    url(r'^QueryStu',views.QueryStu.as_view()),
    url(r'^Setlz',views.Setlouzhang.as_view()),
    url(r'^UnSetlz',views.Unsetlouzhang.as_view()),
    url(r'^UploadD',views.UploadDetection.as_view()),
    url(r'^StuHis',views.StuHistory.as_view()),
    # url(r'^UploadDetection',views.UploadDetection.as_view()),
    url(r'^StuUnrepo',views.STUTodayUnRepo.as_view()),
    url(r'^TeRe',views.TeRepo.as_view()),
    url(r'^TeUnRe',views.TeUnRe.as_view()),
    url(r'^DeleStu',views.DeleStu.as_view()),
    url(r'^Qnotice',views.QueryProccess.as_view()),
    url(r'^Qstart',views.StartQueue.as_view()),
    url(r'^Qfinish',views.FinishQueue.as_view()),
    url(r'^NewNotice',views.NewNotice.as_view()),
    url(r'^HisNotice',views.HisNotice.as_view()),
    url('Upload/',views.UpLoadImg)
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from distutils.command.upload import upload
from operator import truediv
from django.db import models
from rest_framework.response import Response

# Create your models here.
# class Test(models.Model):
#     name = models.CharField(max_length=20)

class Student(models.Model):
    sid = models.CharField(max_length=8, primary_key=True)#学号
    sname = models.CharField(max_length=32)#姓名
    password = models.CharField(max_length=32)#密码
    building=models.CharField(max_length=32)#宿舍楼
    room=models.CharField(max_length=32)#寝室号
    sex=models.CharField(max_length=32)#性别
    sclass=models.CharField(max_length=32)#班级
    xueyuan=models.CharField(max_length=32)#学院
    year=models.CharField(max_length=32)#入学年份
    lxfs=models.CharField(max_length=32)#联系方式
    islouzhang=models.BooleanField()#是否楼长
    tid=models.CharField(max_length=32)#辅导员工号

class Teacher(models.Model):
    tid = models.CharField(max_length=8, primary_key=True)#工号
    tname = models.CharField(max_length=32)#姓名
    sex=models.CharField(max_length=32)#性别
    password = models.CharField(max_length=32)#密码
    lxfs=models.CharField(max_length=32)#联系方式

class Building(models.Model):
    bid= models.CharField(max_length=8, primary_key=True)#楼栋编号
    bname=models.CharField(max_length=32)#楼栋名称
    louzhang=models.CharField(max_length=32)#楼长

class Detection(models.Model):
    did=models.AutoField(primary_key=True)#编号
    sid=models.CharField(max_length=8)#学号
    date=models.CharField(max_length=32)#上传日期
    time=models.CharField(max_length=32)#上传时间
    result=models.BooleanField()#结果
    path=models.CharField(max_length=100)#图片路径
    jcfs=models.CharField(max_length=32)#采集方式

class PicStore(models.Model):
    pid=models.AutoField(primary_key=True)
    imgsrc=models.ImageField(upload_to='photos')
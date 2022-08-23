from configparser import MAX_INTERPOLATION_DEPTH
from pyexpat import model
from django.db import models

# Create your models here.

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
    iscomplished=models.BooleanField(default=False)#是否为核酸已完成状态
    isqueue=models.BooleanField(default=False)#是否是正在排队中，若两个都为false则表示为未完成状态

class Detection(models.Model):
    did=models.AutoField(primary_key=True)#编号
    denum=models.CharField(max_length=32)#抗原检测编号，由后端自动生成
    sid=models.CharField(max_length=8)#学号
    date=models.CharField(max_length=32)#上传日期
    time=models.CharField(max_length=32)#上传时间
    result=models.BooleanField()#结果
    path=models.CharField(max_length=100)#图片路径
    jcfs=models.CharField(max_length=32)#检测方式

class CovidNotice(models.Model):
    cid=models.AutoField(primary_key=True)#编号
    date=models.CharField(max_length=32)#核酸日期
    time=models.CharField(max_length=32)#核酸时间
    info=models.CharField(max_length=256)#核酸信息
    
class PicStore(models.Model):
    pid=models.AutoField(primary_key=True)
    imgsrc=models.ImageField(upload_to='photos')
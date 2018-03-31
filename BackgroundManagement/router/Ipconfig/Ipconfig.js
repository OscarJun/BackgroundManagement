

var express = require('express');
var router = express.Router();



Ipconfig = {
	Sql:{
		SqlName:'sharelink',//数据库名称PeiXunTYuJun 'PeiXunKeyT'
		SqlUserName:'root',//数据库用户名
		SqlPassword:'xiaoniu',//数据库密码 Password1'yujun'
		SqlIpHost:'localhost',//'47.98.132.213',//192.168.50.179'192.168.31.68'
		SqlIpPort:3306,
	},
	Local:{
		LocalIpHost:'47.98.135.197',//外网ip
		// LocalIpHost:'http://192.168.199.210',//本地测试ip
		// DomainName:'http://www.spzxedu.com',//域名
		LocalIpPort:8800//运行端口
	}
}

module.exports = Ipconfig



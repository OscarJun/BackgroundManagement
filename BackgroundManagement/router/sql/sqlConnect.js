
var Sequelize = require('sequelize');
var mssql = require('mssql');
var mysql = require('mysql');
var mysql2 = require('mysql2')
var Ipconfig = require('../Ipconfig/Ipconfig.js')

var sequelize = new Sequelize(
		Ipconfig.Sql.SqlName,//数据库名称
		Ipconfig.Sql.SqlUserName,//数据库用户名//SQLserver默认用户是sa//root是mysql的默认用户
		Ipconfig.Sql.SqlPassword,//数据库密码 SQLserver设置密码是yujun
		{
			dialect:'mysql',//数据库链接使用的包//mssql链接SQLserver//mysql链接MySQL
			host:Ipconfig.Sql.SqlIpHost,//'192.168.199.210'是SQLserver的链接地址,//数据库网址192.168.50.179
			port:'3306',//数据库端口号//3306是MySQL的端口号//1433是SQLserver的端口号
			quoteIdentifiers:true,
			pool:{
				min:0,
				max:50,
				idleTimeoutMillis:3000
			}//数据库连接池
		}
);

sequelize.authenticate().then(function (err) {
	if (err) {
		console.log('连接失败')
		console.log(err);
	} else {
		console.log('数据库连接成功');
	}
});//判断数据库是否链接成功

module.exports = sequelize;

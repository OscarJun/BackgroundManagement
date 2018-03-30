
var express = require('express');
var fs = require('fs');//引入node的文件(夹)读写包
var router = express.Router();
var app = express();
var routeSql = require('../sql/routeSql.js');
var Sequelize = require('sequelize');
var sequelize = require('../sql/sqlConnect.js')



// 获取链接内容
router.get('/LinkUrlList',function(req,res){

	routeSql.AbpLink.findAll({where:{FileLinkId:req.query.Id,IsDeleted:false},order:[['ShowSort','ASC']],attributes:['Id','LinkUrl','Desc','ShowSort','FileLinkId']}).then(function(LinkData){
				res.send({error:0,result:LinkData});
			});
	// routeSql.FileLinkName.findOne({where:{LinkName:req.query.LinkName,IsDeleted:false}}).then(function(FileLinkData){
	// 	// console.log(FileLinkData)
	// 	if (FileLinkData) {
	// 		routeSql.AbpLink.findAll({where:{FileLinkId:FileLinkData.dataValues.Id,IsDeleted:false},order:[['ShowSort','ASC']],attributes:['Id','LinkUrl','Desc','ShowSort','FileLinkId']}).then(function(LinkData){
	// 			res.send({error:0,result:LinkData});
	// 		});
	// 	} else {
	// 		res.send({error:1,result:{msg:'还没有链接'}})
	// 	}
	// });
})

router.post('/CreateNewUrl',function(req,res){
	// console.log(req.body);
	routeSql.AbpLink.max('ShowSort',{where:{FileLinkId:req.body.FileLinkId}}).then(function(MaxShowSort){
		var NewShowSort = MaxShowSort?(MaxShowSort+1):1
		routeSql.AbpLink.create({FileLinkId:req.body.FileLinkId,LinkUrl:req.body.LinkUrl,Desc:req.body.Desc,ShowSort:NewShowSort}).then(function(){
			res.send({error:0,result:{msg:'创建成功'}})
		})
	})
})

module.exports = router;



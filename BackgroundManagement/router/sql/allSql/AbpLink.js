
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js');

var AbpLink = sequelize.define('AbpLink',
{
    Id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    FileLinkId:{
        type:Sequelize.STRING,//链接名称
        allowNull:false,
    },
    LinkUrl:{
        type:Sequelize.STRING//链接路径
    },
    Desc:{
        type:Sequelize.STRING//链接描述
    },
    ShowSort:{
        type:Sequelize.BIGINT,//链接排序序号
        allowNull:false
    },
    IsDeleted:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    DeleterUserId:{
        type:Sequelize.BIGINT
    },
    DeletionTime:{
        type:Sequelize.DATE
    },
    CreationTime:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
    },
    CreatorUserId:{
        type:Sequelize.BIGINT
    }
},{
    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
    freezeTableName:true//Model 对应的表名将与model名相同
})


module.exports = AbpLink;

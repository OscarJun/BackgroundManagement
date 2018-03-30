
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js')

var FileLinkName = sequelize.define('FileLinkName',
{
    Id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    LinkName:{
        type:Sequelize.STRING,//链接名称
        allowNull:false,
    },
    LinkUrl:{
        type:Sequelize.STRING//链接路径
    },
    Desc:{
        type:Sequelize.STRING//链接描述
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
        type:Sequelize.DATE
    },
    CreatorUserId:{
        type:Sequelize.BIGINT
    }
},{
    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
    freezeTableName:true//Model 对应的表名将与model名相同
})


module.exports = FileLinkName;

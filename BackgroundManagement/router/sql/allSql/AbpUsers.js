
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js')

var AbpUsers = sequelize.define('AbpUsers',
{
    Id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    UserName:{
        type:Sequelize.STRING(32),//用户名称
        allowNull:false
    },
    Name:{
        type:Sequelize.STRING(32)//用户姓名
    },
    HeadImage:{
        type:Sequelize.STRING(256)//用户头像
    },
    PhoneNumber:{
        type:Sequelize.STRING(15)//电话号码
    },
    Password:{
        type:Sequelize.STRING(128),//用户密码
        allowNull:false
    },
    EmailAddress:{
        type:Sequelize.STRING(256)//用户邮箱
    },
    LastLoginTime:{
        type:Sequelize.DATE//最后登录时间
    },
    AppLastLoginTime:{
        type:Sequelize.DATE//App最后登录时间
    },
    ExpirationTime:{
        type:Sequelize.DATE//过期时间，后台限制用户使用时间
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
    LastModificationTime:{
        type:Sequelize.DATE     
    },
    LastModifierUserId:{
        type:Sequelize.BIGINT
    },
    CreationTime:{
        type:Sequelize.DATE,
        allowNull:false
    },
    CreatorUserId:{
        type:Sequelize.BIGINT
    },
},{
    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
    freezeTableName:true//Model 对应的表名将与model名相同
})


module.exports = AbpUsers;

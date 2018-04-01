
var routeSql = {}
var AbpUsers = require('./allSql/AbpUsers.js')
var AbpLink = require('./allSql/AbpLink.js')
var FileLinkName = require('./allSql/FileLinkName.js')

AbpUsers.sync({force:false});
AbpLink.sync({force:false});
FileLinkName.sync({force:false});

routeSql.AbpUsers = AbpUsers;
routeSql.AbpLink = AbpLink;
routeSql.FileLinkName = FileLinkName;

module.exports = routeSql
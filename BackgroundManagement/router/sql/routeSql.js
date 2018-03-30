
var routeSql = {},
AbpUsers = require('./allSql/AbpUsers.js'),
AbpLink = require('./allSql/AbpLink.js'),
FileLinkName = require('./allSql/FileLinkName.js')

AbpUsers.sync({force:false});
AbpLink.sync({force:false});
FileLinkName.sync({force:false});

routeSql.AbpUsers = AbpUsers;
routeSql.AbpLink = AbpLink;
routeSql.FileLinkName = FileLinkName;

module.exports = routeSql
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: { rootPath: rootPath , db:'mongodb://localhost/multivision',port: process.env.PORT || 3000 },
    production: { rootPath: rootPath, db: 'mongodb://ali:mobman9284@ds047315.mongolab.com:47315/multivision', prot: process.env.PORT || 3030 }
    //production: { rootPath: rootPath, db: 'mongodb://localhost/multivision', prot: process.env.PORT || 80 }
    
};
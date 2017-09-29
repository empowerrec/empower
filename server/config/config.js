var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/empower',
        //db: 'mongodb://ali:123@ds041486.mlab.com:41486/empower',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        sessionSecret: 'developmentSessionSecret',
        facebookAuthentication: {
            'clientID': '588837614619121',
            'clientSecret': '4548cd3dea5d5aa6b7330a351e0d22b6',
            'callbackURL': 'http://localhost:3030/auth/facebook/callback'
        },
        googleAuthentication: {
            'clientID': '591834079484-kcos7safva4drele71eekv5bbu971m28.apps.googleusercontent.com',
            'clientSecret': 'F0_Vj094rgHaKKHENOMnfBi7',
            'callbackURL': 'http://localhost:3030/auth/google/callback'
        },
        AppURL: 'http://localhost:3030',
        Domain: '127.0.0.1'
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://ali:123@ds041486.mlab.com:41486/empower',
        port: process.env.PORT || 80,
        sessionSecret: 'productionSessionSecret',
        facebookAuthentication: {
            'clientID': '588837614619121',
            'clientSecret': '4548cd3dea5d5aa6b7330a351e0d22b6',
            'callbackURL': 'https://empowerrec.herokuapp.com/auth/facebook/callback'
        },
        googleAuthentication: {
            'clientID': '591834079484-kcos7safva4drele71eekv5bbu971m28.apps.googleusercontent.com',
            'clientSecret': 'F0_Vj094rgHaKKHENOMnfBi7',
            'callbackURL': 'https://empowerrec.herokuapp.com/auth/google/callback'
        },
        AppURL: 'https://empowerrec.herokuapp.com',
        Domain: 'empowerrec.herokuapp.com'
    }
};
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/empower',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        sessionSecret: 'developmentSessionSecret',
        facebookAuthentication: {
            'clientID': '588837614619121',
            'clientSecret': '4548cd3dea5d5aa6b7330a351e0d22b6',
            'callbackURL': 'http://localhost:3030/auth/facebook/callback'
        },
        googleAuthentication: {
            'clientID': '632246168328-uh62qkm2itogthjofivs8pq8kjgca72d.apps.googleusercontent.com',
            'clientSecret': '3aNpsCkTkmp4lZnlGdTubGA0',
            'callbackURL': 'http://localhost:3030/auth/google/callback'
        }
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds029615.mongolab.com:29615/empower',
        port: process.env.PORT || 80,
        sessionSecret: 'productionSessionSecret',
        facebookAuthentication: {
            'clientID': '588837614619121',
            'clientSecret': '4548cd3dea5d5aa6b7330a351e0d22b6',
            'callbackURL': 'https://empowerrec.herokuapp.com/auth/facebook/callback'
        },
        googleAuthentication: {
            'clientID': '632246168328-uh62qkm2itogthjofivs8pq8kjgca72d.apps.googleusercontent.com',
            'clientSecret': '3aNpsCkTkmp4lZnlGdTubGA0',
            'callbackURL': 'https://empowerrec.herokuapp.com/auth/google/callback'
        }
    }
};
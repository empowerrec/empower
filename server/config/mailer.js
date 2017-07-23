var email = require('mailer');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
exports.sendMail = function sendMail(sender , reciver , messageSubject , messageBody , template , data) {
    email.send({
        ssl: true,
        host: "smtp.gmail.com",              // smtp server hostname
        port: "465",                     // smtp server port
        domain: config.Domain,            // domain used by client to identify itself to server
        to: reciver,
        from: sender,
        subject: messageSubject,
        template: template,   // path to template name
        data: data,
        body: messageBody,
        authentication: "login",        // auth login is supported; anything else is no auth
        username: "toptalentsonline@gmail.com",       // Base64 encoded username
        password: "toptalents@123"        // Base64 encoded password
    },
    function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('message sent sussefully');
            console.log(result);
            //return res.send(req.user);
        }
    });
}
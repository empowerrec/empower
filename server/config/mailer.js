var email = require('mailer');

exports.sendMail = function sendMail(sender , reciver , messageSubject , messageBody) {
    email.send({
        ssl: true,
        host: "smtp.live.com",              // smtp server hostname
        port: "587",                     // smtp server port
        domain: "[https://empowerrec.herokuapp.com]",            // domain used by client to identify itself to server
        to: reciver,
        from: sender,
        subject: messageSubject,
        body: messageBody,
        authentication: "login",        // auth login is supported; anything else is no auth
        username: "ali7ussein@live.com",       // Base64 encoded username
        password: "mobman9284"        // Base64 encoded password
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
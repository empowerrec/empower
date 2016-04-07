var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.engine('html', require('ejs').renderFile);
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        //cookie : { maxAge: 7 * 24 * 60 * 60 * 1000}, // 7 days
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath + '/public'));

    app.use(function (req, res, next) {
        if (req.method == 'POST' && req.url == '/login') {
            console.log(req.body.rememberme);
            if (req.body.rememberme) {
                req.session.cookie.maxAge = 604800000; // 7*24*60*60*1000 Rememeber 'me' for 7 days
            } else {
                req.session.cookie.expires = false;
            }
        }
        next();
    });
};
﻿var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var logger = require('express-logger');
var cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app,config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set("view engine", "jade");
    app.use(stylus.middleware({
        src: config.rootPath,
        compile: compile
    }));
    app.use(cookieParser());
    app.use(session({ secret: 'multi vision unicorns' }));
    app.use(passport.initialize());
    app.use(passport.session());
//app.use(logger('dev'));
    app.use(bodyParser());
    app.use(express.static(config.rootPath + "/public"));
}
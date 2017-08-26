var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session),
    multer = require('multer'),
    fs = require('fs');

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.engine('html', require('ejs').renderFile);
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'html');

    //use function used Every time the app receives a request
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        store: new MongoStore({
            url: config.db
        }),
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

            if (req.body.rememberme) {
                req.session.cookie.maxAge = 604800000; // 7*24*60*60*1000 Rememeber 'me' for 7 days
            } else {
                req.session.cookie.expires = false;
            }
        }
        next();
    });

    //upload files start
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    /** Serving from the same express Server
    No cors required */
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/images/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null, file_name: req.file.filename });
        });
    });
    app.get('/upload/*', function (req, res) {

        var filePath = config.rootPath + 'public\\images\\uploads\\' + req.params[0];
        // Check if file specified by the filePath exists 
        fs.readFile(filePath, function (err, content) {
            if (err) {
                res.writeHead(400, { 'Content-type': 'text/html' })
                res.end("No such image");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200, { 'Content-type': 'image/jpg' });
                res.end(content);
            }
        });

    });
    //upload files end

};
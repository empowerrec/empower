var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var config = require('./server/config/config.js')[env];

require('./server/config/express.js')(app, config);

require('./server/config/mongoose.js')(config);

require('./server/config/routes.js')(app);

require('./server/config/passport.js')();

var port = process.env.PORT || 3030;


app.listen(port);
console.log('Listening on port ' + port + '...');
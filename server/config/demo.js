var email = require("./node_mailer");

for(var i = 0; i < 1; i++){
  email.send({
    ssl: true,
    host : "smtp.gmail.com",              // smtp server hostname
    port : 465,                     // smtp server port
    domain : "[127.0.0.1]",            // domain used by client to identify itself to server
    to : "ali7ussein@gmail.com",
    from : "ali7ussein@gmail.com",
    subject : "node_mailer test email",
    reply_to:"ali7ussein@gmail.com",
    body: "Hello! This is a test of the node_mailer.",
    authentication : "login",        // auth login is supported; anything else is no auth
    username : "ali7ussein@gmail.com",            // username
    password : "mobman9284",            // password
    debug: true ,
          template : "./templates/sample-html.txt",   // path to template name
          data : {
              "username": "Billy Bob",
              "color": function(){
                  var arr = ["purple", "red", "green", "yello"];
                  return arr[Math.floor(Math.random()*3)];
              },
              "animal": "monkey",
              "adverb": "quickly",
              "noun": "hot lava"
          }// log level per message
  },
  function(err, result){
    if(err){ console.log(err); }
  });
}

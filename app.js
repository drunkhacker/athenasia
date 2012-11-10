
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , git = require('./routes/git')
  , http = require('http')
  , path = require('path')
  , exec = require('child_process').exec;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/favicon.gif'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//grab the last commit
var lastDate;
var lastCommit;
var c = true;
exec("git log -l --date=iso -n1", {cwd:__dirname}, function(err, stdout, stderr) {
  var arr = stdout.split("\n");
  lastDate = arr[2].match(/Date:\s+(.*)/)[1];
  lastCommit = arr[0].match(/commit (.*)/)[1];
  console.log("lastdate = " + lastDate);
  console.log("lastcommit = " + lastCommit);
  app.get('/', routes.index(lastDate, lastCommit));
  app.get('/users', user.list);
  app.post('/git/pushed', git.pushed);
  
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
});




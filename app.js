
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index'),
    todos = require('./routes/todos');

var app = module.exports = express.createServer();

var compact = require('compact').createCompact({
  srcPath: __dirname + '/public/javascripts/',
  destPath: __dirname + '/public/widget/',
  webPath: '/widget/',
  debug: false
});

compact.addNamespace('todoapp', __dirname + '/public/javascripts/')
  .addJs('/vendor/json2.js')
  .addJs('/vendor/jquery-1.7.1.js')
  .addJs('/vendor/underscore-1.3.1.js')
  .addJs('/vendor/backbone-0.9.1.js')
  .addJs('/easyXDM/easyXDM.debug.js')
  .addJs('/intro.js')
  .addJs('/backbone.easyXDM.js')
  .addJs('/app.js')
  .addJs('/templates.js')
  .addJs('/todos.js')
  .addJs('/load.js')
  .addJs('/outro.js');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(compact.js(['todoapp']));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
 });

app.get('/', routes.index);

app.get('/todos', todos.all);
app.get('/todos/:id', todos.get);
app.post('/todos', todos.add);
app.put('/todos/:id', todos.update);
app.del('/todos/:id', todos.del);

app.listen(8000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

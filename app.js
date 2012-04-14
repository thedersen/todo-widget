
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index'),
    todos = require('./routes/todos');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/todos', todos.all);
app.get('/todos/:id', todos.get);
app.post('/todos', todos.add);
app.put('/todos/:id', todos.update);
app.del('/todos/:id', todos.del);

app.listen(8000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

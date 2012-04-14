module.exports = (function(_){
    var todos = {}, id = 0;
    return {
        all: function(req, res){
            var resp = [];
            for (var todo in todos) {
                resp.push(todos[todo]);
            }
            res.json(resp);
        },

        get: function(req, res) {
            var todo = todos[req.params.id];
            if(todo) {
                res.json(todo);
            } else {
                res.send('Sorry, cant find it..', 404);
            }
        },

        add: function(req, res){
            var todo = _.extend(req.body, {id: ++id});
            todos[todo.id] = todo;
            res.json(todo);
        },

        update: function(req, res){
            todos[req.params.id] = req.body;
            res.send();
        },

        del: function(req, res){
            delete todos[req.params.id];
            res.send();
        }
    };
}(require('underscore')));

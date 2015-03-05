define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var ToDo = Backbone.Model.extend({
        urlRoot: '/todo/',

        getDone: function() {
            return this.get("done");
        },

        setDone: function(isDone) {
            this.save({'done': isDone}, {patch: true});
        }
    });

    var ToDoList = Backbone.Collection.extend({
        model: ToDo,
        url: '/todo/',
    });

    var List = Backbone.Model.extend({
        urlRoot: '/todo-list/',
    });

    var Lists = Backbone.Collection.extend({
        model: List,
        url: '/todo-list/'
    });

    return {
        List: List,
        Lists: Lists,
        ToDo: ToDo,
        ToDoList: ToDoList
    };
});

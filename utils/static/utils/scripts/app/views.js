define(['jquery', 'underscore', 'backbone', 'marionette', 'app/models'], function ($, _, Backbone, Marionette, models) {
    var ToDoView = Backbone.Marionette.ItemView.extend({
        tagName: 'li',
        template: Backbone.Marionette.TemplateCache.get("#list-item"),

        ui: {
            'toggleItemDone': '.toggle-item-done',
            'deleteItem': '.delete'
        },

        events: {
            "click @ui.toggleItemDone": "toggleDoneState",
            "click @ui.deleteItem": "deleteTodo"
        },

        onRender: function() {
            if (this.model.getDone()) {
                this.ui.toggleItemDone.prop("checked", true);
                this.ui.toggleItemDone.parent().addClass("completed");
            }
        },

        toggleDoneState: function() {
            var isDone = this.ui.toggleItemDone.prop("checked");
            this.model.setDone(isDone);
            if (this.model.getDone()) {
                this.ui.toggleItemDone.parent().addClass("completed");
            } else {
                this.ui.toggleItemDone.parent().removeClass("completed");
            }
        },

        deleteTodo: function() {
            this.model.destroy();
        }
    });

    var ToDoListView = Backbone.Marionette.CompositeView.extend({
        childView: ToDoView,
        childViewContainer: 'ul',
        template: Backbone.Marionette.TemplateCache.get("#list-view"),

        ui: {
            'itemTitle': '.item-title'
        },

        events: {
            "keypress #newTodoItem": "onKeyPress"
        },

        onKeyPress: function(e){
            if (e.keyCode == 13) {
                var listItem = new models.ToDo({
                    'done': false,
                    'title': this.ui.itemTitle.val(),
                    'user': config.uid
                });
                this.ui.itemTitle.val("");
                this.collection.create(listItem);
            }
        }
    });
    
    var ListView = Backbone.Marionette.ItemView.extend({
        tagName: 'li',
        className: 'list',
        template: Backbone.Marionette.TemplateCache.get("#list"),
      
        events: {
            "click .list": "clickListTitle"
        },
      
      clickListTitle: function() {
          var toDoList = new models.ToDoList();
          toDoList.fetch({
              success: function(c) {
                  (new ToDoListView({
                      collection: c,
                      el: '#todo-list'
                  })).render();
              }
          });
        }
    });
    
    var ListsView = Backbone.Marionette.CompositeView.extend({
        childView: ListView,
        childViewContainer: 'ul',
        template: Backbone.Marionette.TemplateCache.get("#lists"),
    });

    return {
        ListView: ListView,
        ListsView: ListsView,
        ToDoView: ToDoView,
        ToDoListView: ToDoListView
    };
});

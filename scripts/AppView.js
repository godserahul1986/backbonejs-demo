var Backbone = require("backbone");
Backbone.$ = require("jquery");
var _ = require("underscore");
var TodoModel = require("./TodoModel");
var TodoView = require("./TodoView");
var template = require("../template");

module.exports = Backbone.View.extend({
  tagName: "div",

  events: {
    'keypress input.new-task': 'addTask'
  },

  addTask: function (e) {
    if (e.keyCode === 13) {
      var taskTitle = this.$('input.new-task').val();
      this.$('input.new-task').val("");
      var todoModelInstance = new TodoModel({
        title: taskTitle,
        completed: false
      });
      var todoViewInstance = new TodoView({
        model: todoModelInstance
      });
      $('#todos').append(todoViewInstance.render());
    }
  },

  initialize: function() {
      this.render();
      return this;
  },

  render: function () {
    $('.todo-app').append(this.$el.html(template()));
  }

});

// module.exports = AppView;

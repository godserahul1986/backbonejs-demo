var Backbone = require("backbone");
Backbone.$ = require("jquery");
var _ = require("underscore");
var template;
template = require("../todo-item");

module.exports = Backbone.View.extend({

  tagName: "li",

  className: "todo-item",

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function () {
    this.$el.html(template(this.model.toJSON()));
    return this.$el;
  },

  events: {
    'click .status': 'toggleState',
    'dblclick .title': 'enableEditing',
    'keypress .title-edit': 'closeEditing',
    'click .delete': 'deleteTask',
    'click .high': 'changePriority',
    'click .medium': 'changePriority',
    'click .low': 'changePriority'
  },

  toggleState: function () {
    this.model.toggleState();
    this.$el.toggleClass('completed');
  },

  enableEditing: function () {
    this.$el.addClass('editing');
    this.$('.title-edit').val(this.model.get('title'));
  },

  closeEditing: function (e) {
    if (e.keyCode === 13) {
      this.saveTask();
      this.$el.removeClass('editing');
    }
  },

  saveTask: function () {
    var updatedTask = this.$('.title-edit').val();
    this.model.set("title", updatedTask);
  },

  deleteTask: function () {
    this.model.destroy();
  },

  changePriority: function (e) {
    this.$el.removeClass().addClass('todo-item');
    var priority = e.currentTarget.className;
    switch (priority) {
      case "high": this.$el.addClass("high"); break;
      case "medium": this.$el.addClass("medium"); break;
      case "medium": this.$el.addClass("low"); break;
      default: this.$el.addClass("low"); break;
    }
    this.model.set("priority", priority);
  }

});

// module.exports = TodoView;

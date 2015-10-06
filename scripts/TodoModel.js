var Backbone = require("backbone");
Backbone.$ = require("jquery");

module.exports = Backbone.Model.extend({

  defaults: {
    'title': '',
    'priority': 'low',
    'completed': false
  },

  toggleState: function () {
    this.completed = !this.completed;
  }

});

// module.exports = TodoModel;

define([
  // Global application context.
  "app",

  // Third-party libraries.
  "backbone"
],

function(app, Backbone) {

  var Repo = app.module();

  Repo.Model = Backbone.Model.extend({
    initialize: function(attributes) {
      var homepage = this.get('homepage');
      if (homepage && (homepage.slice(0,4) !== 'http')) {
        this.set('homepage', 'http://' + homepage);
      }
      if (this.get('description')) {
        this.set('description_length', this.get('description').length);
      }
      else {
        this.set('description_length', 0);
      }

    }
  });

  Repo.Collection = Backbone.Collection.extend({

    model: Repo.Model,

    sync: function(method, model, options) {
      options.dataType = 'jsonp';
      return Backbone.sync(method, model, options);
    },

    parse: function(resp) {
      return resp.data;
    },

    url: "https://api.github.com/users/codeforamerica/repos",

    fetchAll: function(options) {
      var self = this;
      var options = options || { data: {} };

      var params = {
        page:  ++options.data.page || 1,
        per_page: 100,
        sort: 'created',
        direction: 'desc'
      };

      var success = function(model, resp) {
        if( resp.data.length > 0 ) {
          options.data = params;
          options.add = true;
          self.fetchAll(options); // recurse!
        }
        else {
          self.trigger('reset'); // setting {add: true} requires this
        }
      };

      return this.fetch(_.extend(options, {success: success, data: params}));
    },

    cache: false,

    comparator: function(repo) {
      var sortOn = this.sortOn || 'created_at';
      return repo.get(sortOn);
    },

    initialize: function(models, options) {
      this.fetchAll();
    }
  });

  Repo.Views.Item = Backbone.View.extend({
    template: "repo/item",

    tagName: "tr",

    serialize: function() {
      return { model: this.model };
    },

    initialize: function() {
      // 
    }
  });

  Repo.Views.List = Backbone.View.extend({
    template: "repo/list",

    events: {
      "click th[data-sort]": "tableSort"
    },

    tableSort: function(e) {
      this.collection.sortOn = $(e.target).attr('data-sort');
      this.collection.sort();
    },

    serialize: function() {
      return { collection: this.collection };
    },

    render: function(manage) {
      this.collection.each(function(repo) {
        this.insertView("tbody", new Repo.Views.Item({
          model: repo
        }));
      }, this);

      return manage(this).render();
    },

    initialize: function() {
      this.collection.on("reset", this.render, this);
    },

  });

  return Repo;

});
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

      this.getReview();
    },

    getReview: function() {
      var self = this;
      $.ajax({
        dataType: 'json',
        url: 'reviews/' + self.get('name') + '.json',
        statusCode: {
          404: function() {
            self.set('review', null);
          },
        },
        success: function(data) {
          self.set('review', data);
        },
        error: function(req, type, err) {
          return; // do nothing
        }
      });
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
        direction: 'asc'
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

      if (sortOn.split('/').length > 1) {
        var sortOn = sortOn.split('/');
        if (repo.get(sortOn[0])) {
          return repo.get(sortOn[0])[sortOn[1]];
        }
        else {
          return -Infinity;
        }
      }
      else {
        return repo.get(sortOn);
      }
    },

    sortBy:  function (comparator) {
      var models = _.sortBy(this.models, comparator);
      if (this.sortReverse) {
        models.reverse();
      }
      return models;
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
      var newSortOn = $(e.target).attr('data-sort');
      if (this.collection.sortOn == newSortOn) {
        this.collection.sortReverse = !this.collection.sortReverse;
        this.collection.sort();
      }
      else {
        this.collection.sortOn = newSortOn;
        this.collection.sortReverse = false;
        this.collection.sort();
      }
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
define([
  // Application.
  "app",

  // Modules.
  "modules/repo"
],

function(app, Repo) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      // Use the main layout.
      app.useLayout("main").render();
    },

    initialize: function() {
      // Set up the Repositories.
      this.repo = new Repo.Collection();

      // Use main layout and set Views.
      app.useLayout("main");
      
      app.layout.setViews({
        "#repos": new Repo.Views.List({
          collection: this.repo
        }),
      });
    }
  });

  return Router;

});

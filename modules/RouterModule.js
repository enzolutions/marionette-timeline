define(["marionette"], function (Marionette) {
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "list",
      "filter/:min/:max": "list"
    },
  });

  return Router;
});

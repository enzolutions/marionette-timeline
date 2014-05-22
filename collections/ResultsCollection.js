define(["marionette",
        "../models/ResultModel"], function(Marionette, Result ) {

    var Results = Backbone.Collection.extend({
       model: Result,
       initialize : function(options) {
          this.min = options.min;
          this.max = options.max;
       },
       url: function() {
         return 'http://localhost:8080/rest/covers/' + this.min + '/' + this.max;
       },
    });

    return Results;

});

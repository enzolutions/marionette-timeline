define(["marionette",
        "../collections/ResultsCollection",
        "../views/ResultsView",
        'masonry',],
        function (Marionette, Results, ResultsView, Masonry) {

    var Controller = Marionette.Controller.extend({
        initialize : function(options) {
          // store a region that will be used to show the stuff rendered by this component
          this.mainRegion = options.mainRegion;
        },
        /**
         * Initialized on start, without hash
         * @method
         */
         list :  function (min, max) {
          if(min === null ) {
            min = new Date(2014, 3, 19).toString("yyyy-M-d");
            max = new Date(2014, 4, 5).toString("yyyy-M-d");
          }

          var results = new Results({ min: min, max: max });

          var resultsView = new ResultsView({ collection: results , vent: this.vent });

          // Create a new variable for vent to enable be accessible in trigger response
          var vent = this.vent;

          // Get data and wait clients before render
          results.fetch({
            update: true ,
            success: function (results) {
              // Add View to region to be render
              this.mainRegion.show(resultsView);

              // Apply mansory tile
              var msnry = new Masonry( '#container', {
                // options
                columnWidth: 290,
                itemSelector: '.item'
              });

            }.bind(this)
          });
        },
    });

    return Controller;
});

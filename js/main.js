require.config({
  baseUrl: 'vendor',
  paths : {
    backbone : 'backbone',
    underscore : 'underscore',
    jquery : 'jquery',
    text: 'text',
    marionette : 'backbone.marionette',
    wreqr : 'backbone.wreqr',
    eventbinder : 'backbone.eventbinder',
    babysitter : 'backbone.babysitter',
    jqrangeslider: 'jQDateRangeSlider-withRuler-min',
    jquery_mousewheel: 'jquery.mousewheel.min',
    jquery_ui: 'jquery-ui.min',
    date: 'date',
    masonry: 'masonry.pkgd.min'
  },
  shim : {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    jquery_ui: {
      deps: ['jquery']
    },
    jquery_mousewheel: {
      deps: ['jquery', 'jquery_ui']
    },
    masonry: {
      deps: ['jquery'],
      exports: 'Masonry'
    },
    jqrangeslider: {
      deps: ['jquery','jquery_mousewheel']
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    wreqr: {
      deps : ['backbone'],
      exports: 'Backbone.Wreqr'
    },
    eventbinder : {
      deps : ['backbone']
    },
    babysitter : {
      deps: ['backbone']
    },
    marionette : {
      deps: ['wreqr', 'eventbinder', 'babysitter', 'date'],
      exports : 'Marionette'
    }
  }
});

// Loading dependences and module to execute Marionette App
require( ["marionette",
          "../modules/RouterModule",
          "../modules/ControllerModule",
          "../views/HeaderView",
          "../views/FooterView",
          "../views/DateFilterView",
          "jqrangeslider",],
          function (Marionette, RouterModule, ControllerModule, HeaderView, FooterView, DateFilterView) {
    // set up the app instance
    var MyApp = new Marionette.Application();

    // Define regions
    MyApp.addRegions({
      headerRegion: "#header-region",
      toolbarRegion: "#toolbar-region",
      mainRegion: "#main-region",
      footerRegion: '#footer-region'
    });

    // Initialize the app controller
    // Pass reference to Main Region to Controller
    var controller = new ControllerModule({
      mainRegion: MyApp.mainRegion,
      toolbarRegion: MyApp.toolbarRegion
    });

    // initialize the router
    MyApp.router = new RouterModule({
      controller : controller
    });

    // Initialize the app router if neccessary
    MyApp.addInitializer(function(options) {});

    MyApp.on("initialize:after", function(){

      // Creating a generic ItemView for Header
      headerView = new HeaderView();

      // Add Header View to region to be render
      MyApp.headerRegion.show(headerView);

      // Creating a generic ItemView for Footer
      footerView = new FooterView();

      // Add Header View to region to be render
      MyApp.footerRegion.show(footerView);

      // Postpone jQuery Date Range filter initialize after region is render
      MyApp.toolbarRegion.on("show", function(view) {
        //Enable Date Range Slider
        var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var start_date = new Date(2014, 3, 19);
        var end_date = new Date(2014, 4, 5);

        jQuery("#date_filter_slider").dateRangeSlider({
          bounds: {min: new Date(2014, 3, 1), max: new Date(2014, 5, 1, 12, 59, 59)},
          defaultValues: {min: start_date , max: end_date},
          scales: [{
            next: function(val){
              var next = new Date(val);
              return new Date(next.setMonth(next.getMonth() + 1));
            },
            label: function(val){
              return Months[val.getMonth()];
            }
          }]
        });

        // Bind Date Range Slide change event to trigger routing filter
        jQuery("#date_filter_slider").bind("valuesChanged", function(e, data){
          var min = new Date(data.values.min).toString("yyyy-M-d");

          var max = new Date(data.values.max).toString("yyyy-M-d");

          MyApp.router.navigate('#filter/' + min + '/' + max, {trigger: true});
        });
      });

      // Create  Date Filter View (div holder)
      dateFilterView = new DateFilterView({});

      // Add Form to render to main region and avoid be replaced
      MyApp.toolbarRegion.show(dateFilterView);


      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start();
    });

    MyApp.start({});
});

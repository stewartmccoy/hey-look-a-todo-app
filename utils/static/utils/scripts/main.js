// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: '/static/utils/scripts/lib',
    paths: {
        app: '../app',
        jquery: 'jquery',
        underscore: 'underscore',
        json2: 'json2',
        backbone: 'backbone',
        marionette: 'backbone.marionette'
    },
    // shim: {
    //     'backbone.marionette': {
    //         deps: ['backbone'],
    //         exports: 'Marionette'
    //     },
    //     'backbone': {
    //         deps: ['jquery', 'underscore', 'json2'],
    //         exports: 'Backbone'
    //     },
    //     'underscore': {
    //         exports: '_'
    //     }
    // }
});

// Start loading the main app file. Put all of
// your application logic in there.
// require(['app/app']);

require(['app/app'], function(app) {
    app.initialize();
});

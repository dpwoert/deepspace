// Give our package a description
Package.describe({
    summary: "Load webworker files"
});

// Tell Meteor what to do with our package at bundle time
Package.on_use(function (api) {

    //deps
    api.use('iron:router', 'server');

    //add threejs
    api.add_files('route.js', 'server');
    api.export('Webworkers', 'server');

});

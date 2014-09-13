Package.describe({
    summary: "Deepspace - Visual a network as a 3d graph"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','q','three'], 'client');

    // load front-end
    api.add_files([

        'settings.js',

        //tools
        'helpers/global.js',
        'helpers/controls.js',
        'helpers/geometries.js',
        'helpers/material.js',
        'helpers/forceGraph.js',
        'helpers/init.js',

        'build.js'

    ], 'client');

});

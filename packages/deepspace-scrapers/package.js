Package.describe({
    summary: "Deepspace - Scrape tools"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['q'], 'client');

    //load tools for server and front-end
    api.add_files([

        'global.js',
        'local.js'

    ], both);

    // load front-end
    api.add_files([

        'loadScript.js'

    ], 'client');

    //make globals
    api.export('scrapers', both);

});

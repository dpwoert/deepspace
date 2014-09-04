Package.describe({
    summary: "Deepspace - Scrape Facebook data"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','deepspace-scrapers','q'], 'client');

    // load front-end
    api.add_files([

        'api/actions.js',
        'api/scraper.js',
        'network.js'
        // 'visualization/3d.js'

    ], 'client');

});

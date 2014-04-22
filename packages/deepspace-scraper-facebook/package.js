Package.describe({
    summary: "Deepspace - Scrape Facebook data"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','deepspace-scrapers','Q'], 'client');

    // load front-end
    api.add_files([

        'actions.js',
        'scraper.js'

    ], 'client');

});

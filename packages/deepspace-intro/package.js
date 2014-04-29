Package.describe({
    summary: "Deepspace - Intro visualisation"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','three','Q'], 'client');

    // load front-end
    api.add_files([

        'template.html',
        //'actions.js',
        //'scraper.js'

    ], 'client');

});

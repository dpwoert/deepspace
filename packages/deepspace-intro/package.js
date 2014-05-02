Package.describe({
    summary: "Deepspace - Intro visualisation"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','three','templating'], 'client');

    // load front-end
    api.add_files([

        'lib/mousewheel.js',
        'template.html',
        'template.js',
        'intro.js'

    ], 'client');

});

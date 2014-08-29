Package.describe({
    summary: "Deepspace - Intro visualisation v2"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','three','templating','d3'], 'client');

    // load front-end
    api.add_files([

        'template.html',
        'template.js',
        'intro.js'

    ], 'client');

});

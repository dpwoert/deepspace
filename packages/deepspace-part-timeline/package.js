Package.describe({
    summary: "Deepspace - Visual a network as a 3d graph"
});

Package.on_use(function (api) {

    var both = ['client','server'];

    // use dependencies
    api.use(['deepspace','d3','templating','less'], 'client');

    // load front-end
    api.add_files([

        'timeline.html',
        'timeline.js',
        'timeline.less'

    ], 'client');

});

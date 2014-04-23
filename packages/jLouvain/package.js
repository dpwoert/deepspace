Package.describe({
    summary: "jLouvain - This is a javascript implementation of the Louvain community detection algorithm"
});

Package.on_use(function (api) {

    var both = ['client','server'];


    //load tools for server and front-end
    api.add_files('jLouvain.js', both);

    //make globals
    api.export('jLouvain', both);

});

Package.describe({
	summary: "Deepspace - Network visualisations"
});

Package.on_use(function (api) {

	var both = ['client','server'];

	// use dependencies
	api.use(['underscore','three','Q','d3','jLouvain'], 'client');

	// load front-end
	api.add_files([

		'global.js',

		'algorithm/louvain.js',

		'classes/Network.js',
		'classes/Engine.js',
		'classes/Timeline.js',

		'buildpacks/facebook.js'

	], 'client');

	//make globals
	api.export('DS', both);

});

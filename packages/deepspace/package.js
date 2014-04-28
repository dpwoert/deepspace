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

		'3d/geometry.js',
		'3d/materials.js',
		'3d/init.js',
		'3d/lights.js',
		'3d/FX.js',

		'algorithm/louvain.js',

		'classes/Network.js',
		'classes/Engine.js',
		'classes/Timeline.js',

		'buildpacks/facebook.js'

	], 'client');

	//make globals
	api.export('DS', both);

});

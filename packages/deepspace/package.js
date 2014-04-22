Package.describe({
	summary: "Deepspace - Network visualisations"
});

Package.on_use(function (api) {

	var both = ['client','server'];

	// use dependencies
	api.use(['underscore','three','Q'], 'client');

	// load front-end
	api.add_files([

		'global.js',

		'classes/network.js'

	], 'client');

	//make globals
	api.export('DS', both);

});

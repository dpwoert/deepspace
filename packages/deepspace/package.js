Package.describe({
	summary: "Deepspace - Network visualisations"
});

Package.on_use(function (api) {

	var both = ['client','server'];

	// use dependencies
	api.use(['underscore','three','q','d3','jlouvain','templating'], 'client');

	// load front-end
	api.add_files([

		'global.js',

		'3d/lib/FlyControls.js',
		'3d/lib/Detector.js',

		'3d/FX/lib/CopyShader.js',
		'3d/FX/lib/EffectComposer.js',
		'3d/FX/lib/FilmPass.js',
		'3d/FX/lib/FilmShader.js',
		'3d/FX/lib/FXAAShader.js',
		'3d/FX/lib/HorizontalTiltShiftShader.js',
		'3d/FX/lib/VerticalTiltShiftShader.js',
		'3d/FX/lib/RenderPass.js',
		'3d/FX/lib/ShaderPass.js',

		'3d/FX/global.js',
		'3d/FX/copyShader.js',
		'3d/FX/filmGrain.js',
		'3d/FX/FXAA.js',
		'3d/FX/tiltShift.js',

		'3d/geometry.js',
		'3d/materials.js',
		'3d/init.js',
		'3d/lights.js',
		'3d/FX.js',
		'3d/controls.js',
		'3d/build.js',
		'3d/renderManager.js',
		'3d/mouse.js',

		'algorithm/louvain.js',
		'algorithm/voronoi.js',
		'algorithm/sinusPlane.js',

		'classes/Network.js',
		'classes/Engine.js',
		'classes/Timeline.js',

		'template.html',
		'template.js',

		'buildpacks/facebook.js'

	], 'client');

	//make globals
	api.export('DS', both);

});

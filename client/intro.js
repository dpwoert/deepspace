window.intro = {};
window.PI2 = Math.PI * 2;

intro.settings = {
	delta: 100, 
	qx: 100,
	qy: 50,
};

intro.init = function(){
	intro.init3D();
	intro.initDOM();
}

intro.initDOM = function(){
	intro.$ = $('#intro');

	//log in
	intro.$.find('li.login').click(function(){
		intro.loading();
		//loadMain();
	});
}

intro.init3D = function(){

	//camera
	intro.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	intro.camera.position.z = 1000;
	intro.X = 0;
	intro.Y = -(window.innerWidth/2);

	//add scene
	intro.scene = new THREE.Scene();
	intro.particles = new Array();
	intro.count = 0;
	intro.status= 0;

	intro.renderer = null;

	//position
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	//make particle material
	var material = new THREE.ParticleCanvasMaterial( {

		color: 0x000000,
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 1, 0, PI2, true );
			context.fill();

		}

	} );

	//add particles
	var i = 0;
	var particle;

	for ( var ix = 0; ix < intro.settings.qx; ix ++ ) {

		for ( var iy = 0; iy < intro.settings.qy; iy ++ ) {

			particle = intro.particles[ i ++ ] = new THREE.Particle( material );
			particle.position.x = ix * intro.settings.delta - ( ( intro.settings.qx * intro.settings.delta ) / 2 );
			particle.position.z = iy * intro.settings.delta - ( ( intro.settings.qy * intro.settings.delta ) / 2 );
			intro.scene.add( particle );

		}

	}

	//add to DOM
	intro.renderer = new THREE.CanvasRenderer();
	intro.renderer.setSize( window.innerWidth, window.innerHeight );
	$('#intro')[0].appendChild( intro.renderer.domElement );

	intro.animate();

}

intro.animate = function(){

	requestAnimationFrame( intro.animate );

	//loading
	if(intro.loadingData){

		//done loading
		if(intro.status >= 1){
			//$('canvas').fadeOut(500, intro.remove);
		} else {
			intro.status += 0.01;
		}

		//already done loading
		if(intro.hidden) intro.status = 1;

	}

	var full = ($(window).height()*0.75)*intro.status;
	intro.Y = (0 - $(window).height() / 2) + full;

	intro.camera.position.x += ( intro.X - intro.camera.position.x ) * .05;
	intro.camera.position.y += ( - intro.Y - intro.camera.position.y ) * .05;
	intro.camera.lookAt( intro.scene.position );

	var i = 0;

	for ( var ix = 0; ix < intro.settings.qx; ix ++ ) {

		for ( var iy = 0; iy < intro.settings.qy; iy ++ ) {

			particle = intro.particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + intro.count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + intro.count ) * 0.5 ) * 50 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + intro.count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + intro.count ) * 0.5 ) + 1 ) * 2;

		}

	}

	intro.renderer.render( intro.scene, intro.camera );

	intro.count += 0.1;
}

intro.loading = function(){
	//$('body').addClass('main');
	intro.$.find('.content').fadeOut();
	intro.loadingData = true;
}

intro.hide = function(){
	intro.hidden = true;
}

intro.remove = function(){
	intro.$.remove();
}
window.intro = {};
window.PI2 = Math.PI * 2;

intro.settings = {
	delta: 100, 
	qx: 100,
	qy: 50,
	outroTime: 5000
};

intro.init = function(){
	intro.init3D();
	intro.initDOM();
}

intro.initDOM = function(){
	intro.$ = $('#intro');
	intro.loadExample = false;

	//log in
	intro.$.find('li.login').click(function(){
		intro.loading();
	});

	//example
	intro.$.find('li.example').click(function(){
		if($.isPlainObject(EXAMPLE)) intro.loadExample = true;
		intro.$.find('li.login').click();
	});

	//more info
	intro.$.find('li.more-info').click(function(){
		$('#info, .info.overlay').show()
		window.setTimeout(function(){
			$('#info').addClass('show');
			$('body').addClass('modal');
		},0);
	});

	//hide info on overlay click
	$('.overlay.info').click(function(){
		if( $('body').hasClass('modal') ){
			$('#info').removeClass('show');
			$('body').removeClass('modal');

			window.setTimeout(function(){
				$('#info, .info.overlay').hide();
			},500);
		}
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

	if(!intro.removed2) { requestAnimationFrame( intro.animate ); }
	else { return false }

	//loading
	if(intro.loadingData){

		//done loading
		if(intro.status >= 1 && intro.done && !intro.removed){
			intro.remove();
		} else {
			intro.status += 0.01;
		}

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
	if(intro.loadExample){
		data = EXAMPLE;
		intro.done = true;
	} else {
		intro.handle();
	}
	intro.$.find('.content').fadeOut();
	intro.loadingData = true;
}

intro.progress = function(){
	if(!facebook.maxBusy || facebook.maxBusy < facebook.busy){
		facebook.maxBusy = facebook.busy;
	}

	return facebook.busy / facebook.maxBusy;
};

intro.remove = function(){

	window.setTimeout(intro.hide,intro.settings.outroTime);
	$('body').addClass('main');
	intro.removed = true;

	$('canvas').fadeOut(intro.settings.outroTime, function(){
		intro.$.remove();
		intro.removed2 = true;
		delete intro.scene, intro.camera, intro.renderer;
	});

}
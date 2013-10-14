window.light = {};

light.init = function(){

 	light.intensity = DDD.lightPulses ? 0.5 : 1;
 	light.hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, light.intensity);
 	DDD.scene.add(light.hemisphere);

 	light.fadeIn();

};

light.fadeIn = function(){

	$({foo:0}).animate({foo:100}, {
		duration: 5000,
	    step: function(val) {
	        light.hemisphere.intensity = (val/100)*light.intensity;
	    }
	})

};
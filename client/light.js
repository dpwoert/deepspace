window.light = {};

light.init = function(){

	//switch off when quality is medium
	if(DDD.quality < 2){
		DDD.lightPulses = false;
	}

	//add main light
 	light.intensity = DDD.lightPulses ? 0.7 : 1;
 	light.hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, light.intensity);
 	DDD.scene.add(light.hemisphere);

 	light.fadeIn();

 	//create message lights - windows sucks
 	light.nr = DDD.directX ? 75 : 100;
 	light.base = new THREE.PointLight( 0xffffff, 0, 700 );
 	DDD.scene.add(light.base);

	if(DDD.lightPulses)	light.create();
};

light.fadeIn = function(){

	$({foo:0}).animate({foo:100}, {
		duration: 5000,
	    step: function(val) {

	    	//fade hemispere
	        light.hemisphere.intensity = (val/100)*light.intensity;

	        //fade lines
	        $.each(graph.force.links(), function(key, link){
		        DDD.lines[key].material.opacity = (val/100)*0.2;
		    });
	    }
	})

};

light.create = function(){
	light.l = [];
	for (var i = 0 ; i < light.nr ; i ++){
		light.l[i] = light.base.clone();
		DDD.scene.add(light.l[i]);
	}

	light.i = 0;
}

light.get = function(){
	var l = light.l[light.i];
	light.i++;
	if(light.i >= light.nr) light.i = 0;
	return l;
}
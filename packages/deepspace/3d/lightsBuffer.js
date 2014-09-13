DS.THREE.LightsBuffer = function(scene){

    //todo automate this
    var lightPulses = true;

    var buffer = [];
    var active = 0;

    //base light, all pulses are clones of this one
    var base = new THREE.PointLight( 0xffffff, 0, 700 );
    base.visisible = false;
    scene.add(base);

    //todo determine maxlights

    //fill buffer
    for( var i = 0 ; i < DS.maxLights ; i++ ){
        var add = base.clone();
        buffer.push(add);
        scene.add(add);
    }

    this.usingPulses = function(){
        return lightPulses;
    }

    //get a light when needed
    this.get = function(){
        var light = buffer[active];
        light.active++;
        if(active >= DS.maxLights) active = 0;
        return light;
    };

    //intro animation
    this.fadeIn = function(){};

}

DS.THREE.LightsBuffer = function(scene){

    //todo automate this
    var lightPulses = true;

    var buffer = [];
    var active = 0;
    var maxLights = 100;
    var maxTries = 5;

    //base light, all pulses are clones of this one
    var base = new THREE.PointLight( 0xffffff, 0, 200 );
    base.visible = false;
    base.intensity = 0;
    //scene.add(base);

    //todo determine maxlights

    //fill buffer
    for( var i = 0 ; i < maxLights ; i++ ){

        // var add = new THREE.PointLight( 0xffffff, 0, 700 );
        var add = base.clone();
        add.intensity = 0;
        buffer.push(add);
        scene.add(add);
    }

    this.usingPulses = function(){
        return lightPulses;
    }

    var getNext = function(){

        var light = buffer[active];
        light.active++;
        if(active >= maxLights) active = 0;
        return light;

    }

    //get a light when needed
    this.get = function(){

        for ( var i = 0 ; i < maxTries ; i++){
            var light = getNext();
            if(!light._blocked) return light;
        }

    };

    //intro animation
    this.fadeIn = function(){};

}

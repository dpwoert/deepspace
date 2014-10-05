DS.THREE.LightsBuffer = function(scene){

    //todo automate this
    var lightPulses = true;

    var buffer = [];
    var active = 0;
    var maxLights = 100;
    var maxTries = 5;

    //base light, all pulses are clones of this one
    var base = new THREE.PointLight( 0xffffff, 0, 100 );
    base.visible = false;
    base.intensity = 0;
    //scene.add(base);

    //todo determine maxlights

    //fill buffer
    for( var i = 0 ; i < maxLights ; i++ ){

        // var add = new THREE.PointLight( 0xffffff, 0, 700 );
        var add = base.clone();
        add._bufferID = i;
        add._blocked = false;
        add.intensity = 0;
        buffer.push(add);
        scene.add(add);
    }

    this.usingPulses = function(){
        return lightPulses;
    }

    var getNext = function(){

        active = (active >= maxLights) ? 0 : active + 1;
        return buffer[active];

    }

    //get a light when needed
    this.get = function(){

        for ( var i = 0 ; i < maxTries ; i++){
            var next = getNext();
            if(next && next._blocked !== true) {
                return next;
            }
        }

    };

    //intro animation
    this.fadeIn = function(){};

}

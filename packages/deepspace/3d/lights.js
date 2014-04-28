DS.THREE.lights = function(){

    //todo automate this
    var lightPulses = true;

    //hemisphere light - lighter when no light pulses
    var intensity = lightPulses ? 0.7 : 1;
    var hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, intensity);
    this.scene.add(hemisphere);

    var buffer = [];
    var active = 0;
    var base = new THREE.PointLight( 0xffffff, 0, 700 );
    this.scene.add(base);

    //fill buffer
    for( var i = 0 ; i<DS.maxLights ; i++ ){
        var add = base.clone();
        buffer.push(add);
        this.scene.add(add);
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

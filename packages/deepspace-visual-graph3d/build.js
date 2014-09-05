//create
Visual.graph3d = function(element, network){

    //render
    DS.THREE.renderManager.call(this);

    //add scene & camera
    helpers.init.call(this, element);

    //create geometries
    this.geom = new helpers.geometries();
    this.material = new helpers.material();

    //import lightsBuffer to animate light pulses
    this.lights = new DS.THREE.LightsBuffer(this.scene);

    //hemisphere light - lighter when no light pulses
    var intensity = this.lights.usingPulses() ? 0.7 : 1;
    var hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, intensity);
    this.scene.add(hemisphere);

    //create force
    this.force = new DS.THREE.ForceGraph(network, this.scene);

    //render
    this.addProcess('aqua3d', function(delta){



    })

}

DS.classes.Engine = function(network){

    //render
    DS.THREE.renderManager.call(this);

    //get geometries
    this.geometries = new DS.THREE.geometry();

    //get materials
    this.materials = new DS.THREE.material();

    //add threejs elements
    DS.THREE.init.call(this);

    //add lights
    this.lights = new DS.THREE.lights(this);

    //add FX
    this.FX = new DS.THREE.FX();

    //add controls
    DS.THREE.controls.call(this);
    DS.THREE.mouse.call(this);

    //build
    DS.THREE.build.call(this);

    //start
    this.start();
}

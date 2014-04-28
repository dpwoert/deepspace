DS.classes.Engine = function(network){

    //get geometries
    var geometries = new DS.THREE.geometry();

    //get materials
    var materials = new DS.THREE.material();

    //add threejs elements
    DS.THREE.init.call(this);

    //add lights
    var lights = DS.THREE.lights.call(this);

    //add FX
    var FX = DS.THREE.FX.call(this);

    //add controls

    //build


    this.addProcess = function(fn){

    };

    var render = function(){

    }

}

helpers.rotationCamera = function(world){

    var camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 0.1, 5000 );
    camera.position.z = 0;
    camera.rotation.y = 90 * Math.PI / 180;

    camera.radius = 500;
    // camera.radius = 750;
    camera.center = new THREE.Vector3(0,0,0);

    var start = Date.now();

    camera.switchControls = function(){
        //todo
    }

    camera.render = function(){

        var elapsedTime = Date.now() - start;
        var constant = 0.0001;

        camera.position.x = camera.center.x + camera.radius * Math.cos( constant * elapsedTime );
        camera.position.z = camera.center.z + camera.radius * Math.sin( constant * elapsedTime );
        camera.position.y = camera.center.y + camera.radius * Math.sin( constant * elapsedTime );
        camera.lookAt( this.center );

    }

    return camera;
}

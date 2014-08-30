DS.THREE.mouse = function(){

    //init
    var projector = new THREE.Projector();

    // this.addProcess('mouse', function(delta){
    //
    //     var vector = new THREE.Vector3(
    //         ( event.clientX / window.innerWidth ) * 2 - 1,
    //         - ( event.clientY / window.innerHeight ) * 2 + 1,
    //         0.5 );
    //
    //     projector.unprojectVector( vector, DDD.camera );
    //
    //     var ray = new THREE.Raycaster( DDD.camera.position, vector.sub( DDD.camera.position ).normalize() );
    //     var intersects = ray.intersectObjects( DDD.nodes );
    //
    //     if ( intersects.length > 0 ) {
    //         //mouse.$who.text(intersects[0].object.name).show();
    //         //mouse.active = intersects[0].object.userData.id;
    //     } else {
    //         //mouse.$who.stop().fadeOut();
    //         //mouse.active = false;
    //     }
    //
    // });

}

window.mouse = {};

mouse.init = function(){
	$('canvas').mousemove(mouse.move);
	mouse.$who = $('#who');
    mouse.lastName = '';
	DDD.projector = new THREE.Projector();
};

mouse.move = function(event){
	//event.preventDefault();

    var vector = new THREE.Vector3( 
        ( event.clientX / window.innerWidth ) * 2 - 1, 
        - ( event.clientY / window.innerHeight ) * 2 + 1, 
        0.5 );

    DDD.projector.unprojectVector( vector, DDD.camera );

    var ray = new THREE.Raycaster( DDD.camera.position, vector.sub( DDD.camera.position ).normalize() );

    var intersects = ray.intersectObjects( DDD.nodes );    

    if ( intersects.length > 0 ) {
        mouse.$who.text(intersects[0].object.name).show();
    } else {
        mouse.$who.stop().fadeOut();
    }
};


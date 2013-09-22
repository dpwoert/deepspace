window.mouse = {};

mouse.init = function(){
	$('canvas').mousemove(mouse.move);
	mouse.who = $('#who');
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

    var intersects = ray.intersectObjects( DDD.mesh );    

    if ( intersects.length > 0 ) {

        //intersects[0].object.callback();
        console.log(intersects);
        mouse.who.text(intersects[0].object.name).show();

    }
};

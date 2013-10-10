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
        //mouse.lightUp(intersects[0].object);
    } else {
        mouse.$who.stop().fadeOut();
    }
};

mouse.lightUp = function(el){
    console.log(el.id);

    $.each(graph.getConnections(el.id, true), function(key, val){
        console.log(val);
        //DDD.lines[val.id].material.color = new THREE.Color( 0xff0000 );
        DDD.lines[val.id].material = new THREE.MeshLambertMaterial( { color: 0xFF0000, shading: THREE.FlatShading, transparent: true, opacity: 0.8 } );
        DDD.lines[val.id].material.needsUpdate = true;
    });
}


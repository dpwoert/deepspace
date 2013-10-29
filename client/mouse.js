window.mouse = {};

mouse.init = function(){

    //events
	$('canvas').mousemove(mouse.move);
    //$('canvas').dblclick(mouse.click);

    //init
	mouse.$who = $('#who');
    mouse.$border = $('.mouseBorder');
    mouse.lastName = '';
    mouse.active = false;
	DDD.projector = new THREE.Projector();

    //dom events
    $('.mouseBorder.close').click(function(){
        mouse.border(false);
    });
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
        mouse.active = intersects[0].object.userData.id;
    } else {
        mouse.$who.stop().fadeOut();
        mouse.active = false;
    }
};

mouse.click = function(){
    //check for mouseover
    if(mouse.active){

        mouse.border(true);

        //get connections
        var connections = graph.getConnections(mouse.active);

        //hide lines, make them visible later
        $.each(DDD.lines, function(){
            this.visible = false;
        });

        //apply on nodes
        $.each(DDD.nodes, function(){

            //reset
            var connected = false;
            var _this = this;

            //check if connected
            $.each(connections, function(){
                if(this.value.target.id == _this.userData.id){
                    connected = true;
                    DDD.lines[this.id].visible = true;
                }
            });

            //update
            if(connected || this.userData.id == mouse.active){
                this.visible = true;
                //this.material = DDD.material.node[this.userData.community];
            } else {
                this.visible = false;
                //this.material = DDD.material.nodeLight[this.userData.community];
                // console.log(this);
            }

            //this.material.needsUpdate = true;

        });

    }
};

mouse.border = function(show){
    if(show){
        mouse.detail = true;
        mouse.$border.fadeIn(500);
    } else {
        //hide border
        mouse.detail = false;
        mouse.$border.fadeOut(500);

        //show elements again
        $.each(DDD.nodes, function(){ this.visible = true; });
        $.each(DDD.lines, function(){ this.visible = true; });
    }
}

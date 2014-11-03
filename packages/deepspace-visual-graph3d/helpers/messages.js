helpers.messages = {};

helpers.messages.add = function(evt){

    //create mesh
    var material = this.material.getMessage();
    var geometry = this.geometry.getMessage();

    //create mesh
    var base = new THREE.Mesh(geometry, material);
    evt.buffer = [];

    //all relations
    var rels = evt.getRelations();

    //create instances for all
    for( var i = 0 ; i < rels.length ;  i++){

        //get relation
        var rel = rels[i];

        //path
        var _from = rel.relation.source.mesh;
        var _to = rel.relation.target.mesh;

        //reversed?
        var from = rel.reversed ? _from : _to;
        var to = rel.reversed ? _to : _from;

        //request light - skip some of the relations to spare lights
        if(i % 2 === 0){

            var light = this.lights.get();
            if(light){
                light.visible = true;
                light._blocked = true;
            }

        }

        //create mesh
        var mesh = base.clone();
        this.scene.add(mesh);

        evt.buffer.push({
            'mesh': mesh,
            'light': light,
            'from': from,
            'to': to
        });

    }

};

helpers.messages.remove = function(evt){

    for( var i = 0 ; i < evt.buffer.length ; i++ ){

        var buffer = evt.buffer[i];

        //clear from scene
        this.scene.remove( buffer.mesh );

        //when still active, dim light
        if(buffer.light){
            buffer.light.visible = false;
            buffer.light._blocked = false;
        }

    }

    //remove buffer
    evt.buffer = undefined;

};

helpers.messages.update = function(evt, progress){

    for( var i = 0 ; i < evt.buffer.length ; i++ ){

        var buffer = evt.buffer[i];
        var newPos = DS.THREE.lerp3d( buffer.from.position, buffer.to.position, progress );

        //update mesh
        buffer.mesh.position.x = newPos.x;
        buffer.mesh.position.y = newPos.y;
        buffer.mesh.position.z = newPos.z;

        //update light?
        if(buffer.light){

            //position
            buffer.light.position.x = newPos.x;
            buffer.light.position.y = newPos.y;
            buffer.light.position.z = newPos.z;

            //light intensity
            if(progress < 0.5){
                buffer.light.intensity = Math.easeInExpo(progress,0,1,0.5);
            } else {
                buffer.light.intensity = Math.easeOutExpo( (progress-0.5) ,1,-1,0.5);
            }

            // buffer.light.intensity = 1;

        }

    }

};

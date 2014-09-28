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
    console.log('sendto', rels.length);

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

        //request light
        var light = this.lights.get();
        //light.visible = true;

        //create mesh
        var mesh = base.clone();
        this.scene.add(mesh);

        evt.buffer.push({
            'mesh': mesh,
            'light': undefined,
            // 'light': light,
            'from': from,
            'to': to
        });

    }

};

helpers.messages.remove = function(evt){

    for( var i = 0 ; i < evt.buffer.length ; i++ ){

        //clear from scene
        this.scene.remove( evt.buffer[i].mesh );

    }

    console.log('removed', evt);

    //remove buffer
    evt.buffer = undefined;

};

helpers.messages.update = function(evt, progress){

    for( var i = 0 ; i < evt.buffer.length ; i++ ){

        var buffer = evt.buffer[i];
        var newPos = DS.THREE.lerp3d( buffer.from.position, buffer.to.position, progress );

        //update mesh
        buffer.mesh.position.x = newPos.x;
        buffer.mesh.position.z = newPos.z;
        buffer.mesh.position.y = newPos.y;

        //update light?
        if(buffer.light){

            //position
            buffer.light.position = newPos;

            //light intensity
            buffer.light.intensity = Math.easeInOutCubic(0,1,progress);

        }

    }

};

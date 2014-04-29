DS.THREE.build = function(){

    this.getMaterial = function(node){
        return {
            normal: materials.nodes[node.community],
            selected: materials.nodesLight[node.community]
        };
    };

    this.addNode = function(node){

        var node = nodes[i];

        var material = this.getMaterial(node);

        //create 3d mesh
        var mesh = new THREE.Mesh( geometries.node, material.normal );
        var meshLight = new THREE.Mesh( geometries.node, material.selected );

        //position
        mesh.position.x = node.x;
        mesh.position.y = node.y;
        var z = DS.startZ + (Math.random()*DS.maxZ);
        mesh.position.z = node.z = z;

        //save info
        mesh.node = node;

        //hide selected version
        meshLight.visible = false;

        debugger

        //add to scene
        this.scene.add(mesh);
        this.scene.add(meshLight);

    };

    this.addLink = function(link){

        var geometry = new THREE.Geometry();

        //positions
        var source = {
            x: link.source.x,
            y: link.source.y,
            z: link.source.z,
        };
        var target = {
            x: link.target.x,
            y: link.target.y,
            z: link.target.z,
        };

        //add vertices
        geometry.vertices.push( source , target );

        var line = new THREE.Line( geometry, this.materials.line );
        var lineLight = new THREE.Line( geometry, this.materials.lineLight );
        var lineHeavy = new THREE.Line( geometry, this.materials.lineHeavy );

        //hide detail lines
        lineLight.visible = false;
        lineHeavy.visible = false;

        this.scene.add(line);
        this.scene.add(lineHeavy);
        this.scene.add(lineLight);

    };

    this.addMessage = function(message){



    };

    //add data


}

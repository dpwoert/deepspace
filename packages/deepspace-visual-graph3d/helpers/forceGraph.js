helpers.ForceGraph = function(network, engine){

    var nodes = [];
    var links = [];

    this.addNode = function(person){

        var material = engine.material.getNode(person.community);
        var geometry = engine.geometry.getNode();

        person.mesh = new THREE.Mesh(geometry, material);
        engine.scene.add(person.mesh);

        person.z = Settings.startDepth + (Math.random()*Settings.maxDepth);
        person.mesh.position = new THREE.Vector3(person.x, person.y, person.z);

    };

    this.addLink = function(relation){
        //console.log(relation);

        var material = engine.material.getLink();
        var geometry = engine.geometry.getLink(relation.source, relation.target);
        relation.mesh = new THREE.Line(geometry, material);
        relation.mesh.frustumCulled = false;
        engine.scene.add(relation.mesh);

    };

    this.renderNode = function(node){

        //only animate when it's needed
        if(this.fixed) return false;

        //animate to new pos
        node.mesh.position.x = node.x;
        node.mesh.position.y = node.y;
        node.mesh.position.z = node.z;

    };

    this.renderLink = function(relation){

        var geometry = relation.mesh.geometry;

        //change pos
        geometry.vertices[0] = relation.source.mesh.position;
        geometry.vertices[1] = relation.target.mesh.position;
        geometry.verticesNeedUpdate = true;

    }

    this.render = function(delta){

        //animate force
        // this.force.tick();

        //animte 3d objects
        var links = this.force.links();
        for( var i = 0 ; i < links.length ; i++ ){

            var link = links[i];
            this.renderNode(link.source);
            this.renderNode(link.target);
            this.renderLink(link);

        }

    };

    //create force
    this.force = d3.layout.force()
        .charge(-300)
        .linkDistance(100)
        // .size(10,10)
        .nodes(network.population)
        .links(network.relations)

    //first step
    this.force.start();
    // this.force.tick();

    //add nodes & relations
    this.force.nodes().forEach(this.addNode);
    this.force.links().forEach(this.addLink);

}

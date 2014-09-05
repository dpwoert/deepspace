helpers.ForceGraph = function(network){

    var nodes = [];
    var links = [];

    this.addNode = function(person){
        console.log(person);

        // var community = graph.community[node.index];
        // var material = DDD.material.node[community];
        // var materialLight = DDD.material.nodeLight[community];
        // var mesh = new THREE.Mesh( DDD.geom.node, material );
        // var meshLight = new THREE.Mesh( DDD.geom.node, materialLight );
        //
    	// mesh.position.x = node.x;
    	// mesh.position.y = node.y;
        // var z = DDD.startZ + (Math.random()*DDD.maxZ);
    	// mesh.position.z = node.z = z;
        //
        // mesh.name = node.name;
        // mesh.userData.index = node.index;
        // mesh.userData.id = node.id;
        // mesh.userData.community = community;
        //
        // meshLight.visible = false;
        //
        // DDD.nodes.push(mesh);
        // DDD.nodesLight.push(meshLight);
        //
        // DDD.scene.add(mesh);
        // DDD.scene.add(meshLight);

    }

    this.addLink = function(relation){
        console.log(relation);
    }

    //create force
    this.force = d3.layout.force()
        .charge(-300)
        .linkDistance(100)
        //.size(10,10)
        .nodes(network.population)
        .links(network.relations)

    //add nodes & relations
    graph.force.nodes().forEach(this.addNode);
    graph.force.links().forEach(this.addLink);

}

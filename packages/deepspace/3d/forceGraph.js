DS.THREE.ForceGraph = function(network){

    this.addNode = function(person){
        console.log(person);
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

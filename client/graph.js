window.graph = {};
graph.data = {};

var lerp = function(a, b, t) {
    return a + (b - a) * t;
};

graph.compareFriends = function(){

    // Extract the list of friend IDs.
    var fids = Object.keys(data.friends);

    // Add some nodes to the graph.
    graph.data.nodes = fids.map(function(id) {
        return {
            id: id,
            name: data.friends[id]
        };
    });

    //make the edges
    graph.data.edges = data.friendRelations.map(function(rel) {
        return {
            source: fids.indexOf(rel.uid1),
            target: fids.indexOf(rel.uid2)
        };
    });

    // Construct a mapping of friendships.
    var friendships = graph.data.edges.reduce(function(acc, x) {
        if (!Object.prototype.hasOwnProperty.call(acc, x.source)) {
            acc[x.source] = [];
        }
        if (!Object.prototype.hasOwnProperty.call(acc, x.target)) {
            acc[x.target] = [];
        }
        if (!~acc[x.source].indexOf(x.target)) {
            acc[x.source].push(x.target);
        }
        if (!~acc[x.target].indexOf(x.source)) {
            acc[x.target].push(x.source);
        }

        return acc;
    }, {});

    // Compute the maximum links from a node.
    var maxFriends = Math.max.apply(Math, Object.keys(friendships).map(function(k) {
        return friendships[k].length;
    }));

    // Compute the size for a node.
    var sizeForNode = function(i) {
        return Math.round(lerp(2, 10, (friendships[i] || [-1]).length / maxFriends));
    };

    console.log('made friends');
};

graph.makeForce = function(){

    console.log('start the force');

    // Create a force layout to display nodes.
    graph.force = d3.layout.force()
        .charge(-300)
        .linkDistance(graph.returnLikes)
        //.size(10,10)
        .nodes(graph.data.nodes)
        .links(graph.data.edges);

    graph.force.start();

};

graph.compareLikes = function(){

    $.each(graph.data.edges, function(k, v){

        //get data
        var s_id = graph.data.nodes[v.source].id;
        var t_id = graph.data.nodes[v.target].id;
        var source = data.likes[parseInt(s_id)];
        var target = data.likes[parseInt(t_id)];

        var compare = 0;

        //compare lists
        $.each(source, function(key, value){
            $.each(target, function(key2, value2){
                if(value.id == value2.id){
                    //found
                    compare++;
                    return false;
                }
            });
        });

        v.likes = compare;
    })
};

graph.returnLikes = function(d, i){
    //return 200;
    var toReturn = 200 - (10*d.likes);
    if(toReturn < 20) toReturn = 20;
    return toReturn;
};

graph.makeCommunities = function(){

    //https://github.com/upphiminn/jLouvain/blob/master/jLouvain.js

    var node_data = [];
    var edge_data = [];
    
    $.each(graph.force.nodes(), function(k, v){
        node_data.push(v.index);
    });

    $.each(graph.force.links(), function(k, v){
        edge_data.push( {source: v.source.index, target: v.target.index, weight: 10.0}) ;
    });


    var community = jLouvain().nodes(node_data).edges(edge_data).partition_init();
    graph.community = community();

};

graph.getConnections = function(id, index){
    var nodes = [];

    $.each(graph.force.links(), function(key, val){

        if(val.source.id == id){
            nodes.push({id:key, negative:false});
        }

        if(index && val.source.index == id){
            nodes.push({id:key, negative:false, 'name': val});
        }

    });

    return nodes;
};
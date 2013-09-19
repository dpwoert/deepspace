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
        .linkDistance(200)
        //.size(10,10)
        .nodes(graph.data.nodes)
        .links(graph.data.edges);

    graph.force.start();

};

graph.compareLikes = function(uid1, uid2, start, multiplyer){
    var likes1 = data.likes[uid1];
    var likes2 = data.likes[uid2];
    var likeable = 0;

    $.each(likes1, function(key, value){
        $.each(likes2, function(key2, value2){
            if(value.id == value2.id){
                likeable ++;
            }
        });
    });

    var result = start - (likeable * multiplyer);
    if(result < 20) result=20;
    console.log(likeable + ' | ' + result + ' | ' + uid1 + ' likes ' + uid2);

    return result;
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

}
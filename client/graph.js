window.graph = {};

//http://codehost.wordpress.com/2011/09/04/cliques-and-social-networks/
//https://github.com/andeek/Community-Detection/tree/master/Prototype%20D3-Shiny/Network%20Graph/scripts
//http://en.wikipedia.org/wiki/Bron-Kerbosch_algorithm

 var lerp = function(a, b, t) {
    return a + (b - a) * t;
};

graph.init = function(){
	d3.select('#next_link').style('display', 'none');
    d3.select('#graph').style('display', null);

    // Append an <svg> element to body for rendering (warning: SVG sucks and will
    // probably hang Firefox, so use Chrome).
    graph.svg = d3.select('#graph')
        .append('svg')
        .attr('width', parseInt(d3.select('#graph').style('width'), 10))
        .attr('height', parseInt(d3.select('#graph').style('height'), 10));

    // Make a <g> tag for zoom purposes.
    graph.g = graph.svg.append('g');

    //zoom
    graph.svg.call(d3.behavior.zoom().on('zoom', function() {
        graph.g.attr('transform',
            'translate(' + d3.event.translate + ')'
            + ' scale(' + d3.event.scale + ')');
    }));
};

graph.makeForce = function(){
    graph.data = {};

    //https://github.com/mrdoob/three.js/

    // Extract the list of friend IDs.
    var fids = Object.keys(facebook.friends);

    // Add some nodes to the graph.
    graph.data.nodes = fids.map(function(id) {
        return {
            id: id,
            name: facebook.friends[id]
        };
    });

    //make the edges
    graph.data.edges = facebook.friendRelations.map(function(rel) {
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

    // Create a force layout to display nodes.
    graph.force = d3.layout.force()
        .charge(-300)
        .linkDistance(200)
        .size([parseInt(d3.select('#graph').style('width'), 10),
               parseInt(d3.select('#graph').style('height'), 10)])
        .nodes(graph.data.nodes)
        .links(graph.data.edges);

    graph.force.start();

    DDD.init();
};

graph.build = function(){

	graph.data = {};

    //https://github.com/mrdoob/three.js/

	// Extract the list of friend IDs.
    var fids = Object.keys(facebook.friends);

    // Add some nodes to the graph.
    graph.data.nodes = fids.map(function(id) {
        return {
            id: id,
            name: facebook.friends[id]
        };
    });

    //make the edges
    graph.data.edges = facebook.friendRelations.map(function(rel) {
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

    // Create a force layout to display nodes.
    graph.force = d3.layout.force()
        .charge(-30000)
        .linkDistance(function(evt){
        	//console.log(evt);
        	//return facebook.compareLikes(evt.source.id, evt.target.id, 200, 25);
            return 20000;
        })
        .size([parseInt(d3.select('#graph').style('width'), 10),
               parseInt(d3.select('#graph').style('height'), 10)])
        .nodes(graph.data.nodes)
        .links(graph.data.edges);

    var paused = false;

    // Add the edges to the SVG.
    var edge = graph.g.selectAll('line.edge')
        .data(graph.data.edges)
        .enter().append('line')
        .attr('class', 'edge')
        .style('stroke', 'rgba(200, 200, 200, 0.2)')
        .style('stroke-width', 0.5);

    // Add the nodes to the SVG.
    var node = graph.g.selectAll('circle.node')
        .data(graph.data.nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', function(d, i) {
            return sizeForNode(i);
        })
        //.style('stroke', 'rgba(100, 100, 100, 0.2)')
        .style('fill', '#fff')
        .style('cursor', 'pointer')
        .on('mouseover', function(d, i) {
            d3.select(this)
                .attr('r', sizeForNode(i) + 5)
                .style('fill', '#f00');
            var name = d3.select(this).data()[0].name;
            d3.select('#who').text(name);

            console.log(d);
            console.log(i);

            //highlite lines
            graph.g.selectAll("line").filter(function(d) {
                return d.source.index == i || d.target.index == i;
            }).style('stroke', '#f00');
        })
        .on('mouseout', function(d, i) {
            d3.select(this)
                .attr('r', sizeForNode(i))
                .style('fill', '#fff');
            d3.select('#who').text('');

            graph.g.selectAll("line").style('stroke', 'rgba(200, 200, 200, 0.2)');
        })
        .call(graph.force.drag);

    // Hook up some events to D3.js.
    graph.force.on('tick', function() {
        node.attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });

        edge.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });
    });

    //blur
    var filter = graph.svg.append("defs")
        .append("filter")
        .attr("id", "blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 2);

    node.attr("filter", "url(#blur)");

    // Start the simulation.
    graph.force.start();

}
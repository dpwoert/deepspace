window.DDD = {
    multiplyer: 5,
	camera : null,
	scene : null,
	renderer : null,
	mesh: [],
	lines: [],
	material: {},
	geom: {}
};

DDD.init = function(){

	//camera
	DDD.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    DDD.camera.position.z = 1000;

    //make scene
    DDD.scene = new THREE.Scene();

    //mesh settings
    DDD.setMaterial();
    //DDD.geom.node = new THREE.SphereGeometry(25, 20, 20);
    DDD.geom.node = new THREE.IcosahedronGeometry(25, 1);
    DDD.material.line = new THREE.LineBasicMaterial( { color: 0xAAAAAA, opacity: 0.1, linewidth: 0.5 } )

    //DDD.addNode(50, 50, 50);

    //start
    DDD.renderer = new THREE.WebGLRenderer();
    DDD.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( DDD.renderer.domElement );

    $('#graph').hide();

    //add nodes
    $.each(graph.force.nodes(), function(key, node){
    	DDD.addNode(node);
    	//node.z = z;
    });

    //add links
    $.each(graph.force.links(), function(key, link){
    	DDD.addLink(link);
    });

    //light
    light.init();

    DDD.setCameraControls();

    DDD.animate();

    //mouse
    mouse.init();
};

DDD.setCameraControls = function(){

	DDD.controls = new THREE.FlyControls( DDD.camera );

	DDD.controls.movementSpeed = 250;
	DDD.controls.domElement = DDD.renderer.domElement;
	DDD.controls.rollSpeed = Math.PI / 6;
	DDD.controls.autoForward = false;
	DDD.controls.dragToLook = false;

};

DDD.setMaterial = function(){

    //get max
    var max = 0;
    $.each(graph.community, function(k,v){
        if(v > max){
            max = v;
        }
    });

    //prepare
    DDD.material.node = [];
    colors = [0x1ABC9c, 0xF1C40F, 0xD35400, 0x3498DB,0xe74c3c,0x9B59B6,0x2c3e50,0x8e44ad];

    //add
    for(var i = 0 ; i < max ; i++){
        DDD.material.node.push(new THREE.MeshLambertMaterial( { color: colors[i], wireframe: false } ) );
    }
}

DDD.animate = function() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( DDD.animate );

    //animate nodes
    $.each(graph.force.nodes(), function(key, node){
    	DDD.mesh[key].position.x = node.x * DDD.multiplyer;
    	DDD.mesh[key].position.y = node.y * DDD.multiplyer;
    });

    //animate links
    $.each(graph.force.links(), function(key, link){

        //updatable
        DDD.lines[key].geometry.verticesNeedUpdate = true;
        DDD.lines[key].geometry.dynamic = true;
        DDD.lines[key].geometry.normalsNeedUpdate = true;

    	DDD.lines[key].geometry.vertices[0].x = link.source.x * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[0].y = link.source.y * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[0].z = link.source.z;

    	DDD.lines[key].geometry.vertices[1].x = link.target.x * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[1].y = link.target.y * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[1].z = link.target.z;
    });

    DDD.controls.update(0.1);

    DDD.renderer.render( DDD.scene, DDD.camera );

};

DDD.addNode = function(node){

    var material = DDD.material.node[graph.community[node.index]];
    var mesh = new THREE.Mesh( DDD.geom.node, material );

	mesh.position.x = node.x;
	mesh.position.y = node.y;
    var z = Math.random()*1000;
	mesh.position.z = node.z = z;

    mesh.name = node.name;

    DDD.mesh.push(mesh);
    DDD.scene.add(mesh);
}

DDD.addLink = function(o){
	var geometry = new THREE.Geometry();
	
	//positions
	var source = {
		x: o.source.x,
		y: o.source.y,
		z: o.source.z,
	};
	var target = {
		x: o.target.x,
		y: o.target.y,
		z: o.target.z,
	};

    //add vertices
    geometry.vertices.push( source , target );

    var line = new THREE.Line( geometry, DDD.material.line );

	DDD.lines.push(line);
	DDD.scene.add( line );
};
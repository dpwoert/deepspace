window.DDD = {

    multiplyer: 5,
    maxZ: 2000,

	camera : null,
	scene : null,
	renderer : null,

	nodes: [],
	lines: [],
    messages: [],

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
    DDD.geom.node = new THREE.IcosahedronGeometry(25, 1);
    DDD.geom.message = new THREE.IcosahedronGeometry(10, 1);

    //start
    DDD.renderer = new THREE.WebGLRenderer();
    DDD.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( DDD.renderer.domElement );
    $('#graph').hide();

    //add nodes
    $.each(graph.force.nodes(), function(key, node){
    	DDD.addNode(node);
    });

    //add links
    $.each(graph.force.links(), function(key, link){
    	DDD.addLink(link);
    });

    //light
    light.init();

    //camera
    DDD.setCameraControls();

    //action
    DDD.animate();

    //mouse
    mouse.init();

    timeline.make3D();
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

    //NODES

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
        DDD.material.node.push(new THREE.MeshLambertMaterial( { color: colors[i], shading: THREE.FlatShading } ) );
    }

    //LINES
    DDD.material.line = new THREE.LineBasicMaterial( { color: 0xAAAAAA, fog: true, linewidth: 0.5 } );

    //MESSAGES
    DDD.material.message = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, shading: THREE.FlatShading } );

}

DDD.animate = function() {

    //pause
    if(DDD.pause) return false

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( DDD.animate );

    //animate nodes
    $.each(graph.force.nodes(), function(key, node){
    	DDD.nodes[key].position.x = node.x * DDD.multiplyer;
    	DDD.nodes[key].position.y = node.y * DDD.multiplyer;
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

    //timeline
    timeline.tick();

    DDD.controls.update(0.1);

    DDD.renderer.render( DDD.scene, DDD.camera );

};

DDD.addNode = function(node){

    var material = DDD.material.node[graph.community[node.index]];
    var mesh = new THREE.Mesh( DDD.geom.node, material );

	mesh.position.x = node.x;
	mesh.position.y = node.y;
    var z = Math.random()*DDD.maxZ;
	mesh.position.z = node.z = z;

    mesh.name = node.name;
    mesh.userData.index = node.index;

    DDD.nodes.push(mesh);
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

DDD.addMessage = function(line, negative){

    var mesh = new THREE.Mesh( DDD.geom.message, DDD.material.message );

    var _line = DDD.lines[line];

    mesh.position.x = _line.geometry.vertices.x;
    mesh.position.y = _line.geometry.vertices.y;
    mesh.position.z = _line.geometry.vertices.z;

    mesh.userData.line = line;
    mesh.userData.negative = negative;

    return mesh;
}
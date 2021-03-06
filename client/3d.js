window.DDD = {

    multiplyer: 5,
    maxZ: 2000,
    startZ: 1000,

	camera : null,
	scene : null,
	renderer : null,

	nodes: [],
    nodesLight: [],

	lines: [],
    linesHeavy: [],
    linesLight: [],

    messages: [],

	material: {},
	geom: {},

    lightPulses: true,
    startAlpha: 0.05,

    quality: 2,
    directX: (navigator.appVersion.indexOf("Win")!=-1)

};

DDD.init = function(){

	//camera
	DDD.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    DDD.camera.position.z = 3000;

    //make scene
    DDD.scene = new THREE.Scene();

    //mesh settings
    DDD.setMaterial();
    DDD.geom.node = new THREE.IcosahedronGeometry(25, 1);
    DDD.geom.message = new THREE.IcosahedronGeometry(5, 1);

    //start
    DDD.renderer = new THREE.WebGLRenderer({
        maxLights: 110
    });
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
    back.init();

    //camera
    DDD.setCameraControls();

    //action
    DDD.animate();

    //mouse
    mouse.init();

    //fx
    FX.init();

    //timeline
    timeline.make3D();

    DDD.enabled = true;

    //analytics
    analytics.addPage('/3d', '3d');
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
    DDD.material.nodeLight = [];

    //add
    for(var i = 0 ; i < max ; i++){
        var nodeColor;
        if(i >= color.nodes.length){ nodeColor = 0xcccccc; } else { nodeColor = color.nodes[i]; }
        DDD.material.node.push(new THREE.MeshLambertMaterial( { 'color': nodeColor, 'shading': THREE.FlatShading } ) );
        DDD.material.nodeLight.push(new THREE.MeshLambertMaterial( { 'color': nodeColor, 'shading': THREE.FlatShading, 'opacity': 0.3, 'transparent': true } ) );
    }

    //LINES
    DDD.material.line = new THREE.LineBasicMaterial( { 'color': 0xa4b2c1, 'fog': false, 'linewidth': 0.005, 'opacity': 0.2, 'transparent': true } );
    DDD.material.lineLight = new THREE.LineBasicMaterial( { 'color': 0xa4b2c1, 'fog': false, 'linewidth': 0.005, 'opacity': 0.1, 'transparent': true } );
    DDD.material.lineHeavy = new THREE.LineBasicMaterial( { 'color': 0xa4b2c1, 'fog': false, 'linewidth': 0.005, 'opacity': 1, 'transparent': true } );

    //MESSAGES
    DDD.material.message = {};
    $.each(color.posts, function(key, val){
        DDD.material.message[key] = new THREE.MeshLambertMaterial( { 'color': val, 'shading': THREE.FlatShading } );
    });

}

DDD.animate = function() {

    //pause
    if(DDD.pause) return false

    //shedule next frame
    requestAnimationFrame( DDD.animate );

    //animate nodes
    $.each(graph.force.nodes(), function(key, node){
    	DDD.nodes[key].position.x = node.x * DDD.multiplyer;
        DDD.nodes[key].position.y = node.y * DDD.multiplyer;
        if(DDD.nodesLight[key].visible){
    	   DDD.nodesLight[key].position = DDD.nodes[key].position;
        }
    });

    //animate links
    $.each(graph.force.links(), function(key, link){

        //updatable
        DDD.lines[key].geometry.verticesNeedUpdate = true;

        //from
    	DDD.lines[key].geometry.vertices[0].x = link.source.x * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[0].y = link.source.y * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[0].z = link.source.z;

        //to
    	DDD.lines[key].geometry.vertices[1].x = link.target.x * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[1].y = link.target.y * DDD.multiplyer;
    	DDD.lines[key].geometry.vertices[1].z = link.target.z;


        //detail lines
        if(DDD.linesHeavy[key].visible){
            DDD.linesHeavy[key].geometry.vertices[0] = DDD.lines[key].geometry.vertices[0];
            DDD.linesHeavy[key].geometry.vertices[1] = DDD.lines[key].geometry.vertices[1];
        } 

        if(DDD.linesLight[key].visible){
            DDD.linesLight[key].geometry.vertices[0] = DDD.lines[key].geometry.vertices[0];
            DDD.linesLight[key].geometry.vertices[1] = DDD.lines[key].geometry.vertices[1];
        }

    });

    //timeline when force is cooled down
    if(graph.force.alpha() < DDD.startAlpha){
        timeline.tick();
    }

    DDD.controls.update(0.1);

    //fx
    // FX.render();

    DDD.renderer.render( DDD.scene, DDD.camera );

};

DDD.addNode = function(node){

    var community = graph.community[node.index];
    var material = DDD.material.node[community];
    var materialLight = DDD.material.nodeLight[community];
    var mesh = new THREE.Mesh( DDD.geom.node, material );
    var meshLight = new THREE.Mesh( DDD.geom.node, materialLight );

	mesh.position.x = node.x;
	mesh.position.y = node.y;
    var z = DDD.startZ + (Math.random()*DDD.maxZ);
	mesh.position.z = node.z = z;

    mesh.name = node.name;
    mesh.userData.index = node.index;
    mesh.userData.id = node.id;
    mesh.userData.community = community;

    meshLight.visible = false;

    DDD.nodes.push(mesh);
    DDD.nodesLight.push(meshLight);

    DDD.scene.add(mesh);
    DDD.scene.add(meshLight);
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
    var lineLight = new THREE.Line( geometry, DDD.material.lineLight );
    var lineHeavy = new THREE.Line( geometry, DDD.material.lineHeavy );

    //hide detail lines
    lineLight.visible = false;
    lineHeavy.visible = false;

    DDD.lines.push(line);
    DDD.linesHeavy.push(lineHeavy);
	DDD.linesLight.push(lineLight);

    DDD.scene.add(line);
    DDD.scene.add(lineHeavy);
	DDD.scene.add(lineLight);
};

DDD.addMessage = function(line, negative, material, noLight){

    var mesh = new THREE.Mesh( DDD.geom.message, material );
    var pulse = noLight ? {} : light.get();

    var _line = DDD.lines[line];

    //pos
    mesh.position.x = _line.geometry.vertices[0].x;
    mesh.position.y = _line.geometry.vertices[0].y;
    mesh.position.z = _line.geometry.vertices[0].z;
    pulse.position = mesh.position;

    //light
    pulse.intensity = 0;
    //light.color =  mesh.material.color;

    mesh.userData.line = line;
    mesh.userData.negative = negative;

    return [mesh, pulse];
};
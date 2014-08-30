DS.Intro = function(element){

    //initialization of globals
    var renderer, camera, scene, material, plane, mesh;
    var accuracy = 20;

    //render loop
    DS.THREE.renderManager.call(this);

    //create camera & scene
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;
    camera.position.y = 100;
    // camera.position.x = 500;
    scene = new THREE.Scene();

    //create renderer
    renderer = new THREE.WebGLRenderer();
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xFFFFFF);
    element.appendChild(renderer.domElement);

    //material
	// material = new THREE.MeshBasicMaterial( { color: 0x222, overdraw: 0.5 } );
    material = new THREE.MeshPhongMaterial({
    	color: 0x444444,
    	shading: THREE.FlatShading,
    	// wireframe: true
    });

    //startof with standard geometry
    plane = new THREE.PlaneGeometry(700,700,accuracy,accuracy);
    mesh = new THREE.Mesh( plane, material );
    mesh.rotateX(-Math.PI/2.5);
    // mesh.rotateX(-Math.PI/2);

    //build wave
    DS.algorithm.sinusPlane(plane, accuracy, accuracy, 0);

    //light
    var light = new THREE.HemisphereLight(0xAAAAAA, 0x00000, 1);

    //add to scene
    scene.add(mesh);
    scene.add(light);

    camera.lookAt( mesh.position );

    //animation loop
    this.addProcess('intro', function(delta){

        //todo

        //render to screen
        renderer.render( scene, camera );

    });

}

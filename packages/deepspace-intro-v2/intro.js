DS.Intro = function(element){

    //initialization of globals
    var renderer, camera, scene, material, material2, plane, mesh, mesh2, FX;
    var accuracy = 20, fase = 0;
    var mouse = {x: 0, y: 0};
    var currentBlur = 0, targetBlur = 0;

    //render loop
    DS.THREE.renderManager.call(this);

    //create camera & scene
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 100;
    camera.position.y = 100;
    // camera.position.x = 500;
    scene = new THREE.Scene();

    //create renderer
    renderer = new THREE.WebGLRenderer();
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    element.appendChild(renderer.domElement);

    //material
    material = new THREE.MeshPhongMaterial({
    	color: 0x282c34,
    	shading: THREE.FlatShading,
    });

    //wireframe
    // material2 = new THREE.MeshLambertMaterial({
    material2 = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    })

    //startof with standard geometry
    plane = new THREE.PlaneGeometry(700,700,accuracy,accuracy);
    mesh = new THREE.Mesh( plane, material );
    mesh.rotateX(-Math.PI/2);

    //wireframe
    mesh2 = mesh.clone();
    mesh2.material = material2;
    mesh2.position.y = 1;

    //build wave
    DS.algorithm.sinusPlane(plane, accuracy, accuracy, fase);

    //light
    var light = new THREE.HemisphereLight(0xAAAAAA, 0x00000, 0.3);

    //add to scene
    scene.add(mesh);
    scene.add(mesh2);
    scene.add(light);

    //look at waves
    camera.lookAt( mesh.position );

    //create FX
    FX = new DS.THREE.FX(renderer, scene, camera);
    FX
        .add('tiltShift')
        .add('filmGrain')
        .add('copyShader');

    //bg
    FX.setBackground(0x000000);

    //animation loop
    this.addProcess('intro', function(delta){

        //move waves
        fase += 0.05;
        DS.algorithm.sinusPlane(plane, accuracy, accuracy, fase);

        //tilt shift
        var blur = targetBlur - ((currentBlur-targetBlur)*0.01);
        if(blur <0.2) blur = 0.2;
        if(blur >0.8) blur = 0.8;
        FX.setBlur(5, blur);

        //render to screen
        // renderer.render( scene, camera );
        FX.render( delta );

    });

    element.addEventListener('mousemove',function(evt){
        mouse.x = evt.screenX;
        mouse.y = evt.screenY;
        targetBlur = 1-(mouse.y/window.innerHeight)
    });

}

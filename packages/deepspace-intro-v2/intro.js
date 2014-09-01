DS.Intro = function(element){

    //initialization of globals
    var renderer, camera, scene, material, material2, plane, mesh, mesh2, FX;
    var light, light2;
    var accuracy = 20, fase = 0;
    var mouse = {x: 0, y: 0};
    var currentBlur = 0, targetBlur = 0;

    //render loop
    DS.THREE.renderManager.call(this);
    DS.THREE.animationHelper.call(this);

    //create camera & scene
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 100;
    camera.position.y = 200;
    // camera.position.x = 500;
    scene = new THREE.Scene();

    //create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    element.appendChild(renderer.domElement);

    //material
    material = new THREE.MeshPhongMaterial({
    	// color: 0x282c34,
    	color: 0x26272b,
    	shading: THREE.FlatShading,
    });

    //wireframe
    material2 = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    })

    //startof with standard geometry
    plane = new THREE.PlaneGeometry(1000,1000,accuracy,accuracy);
    mesh = new THREE.Mesh( plane, material );
    mesh.rotateX(-Math.PI/2);

    //wireframe
    mesh2 = mesh.clone();
    mesh2.material = material2;
    mesh2.position.y = 0.1;

    //build wave
    DS.algorithm.sinusPlane(plane, accuracy, accuracy, fase);

    //light
    light = new THREE.HemisphereLight(0xAAAAAA, 0x00000, 0.5);

    //add to scene
    scene.add(mesh);
    scene.add(mesh2);
    scene.add(light);
    // scene.add(light2);

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

    //camera range
    var range = d3.scale.linear()
        .domain([0,1])
        .range([200,-50])

    //animation loop
    this.addProcess('intro', function(delta){

        //move waves
        fase += 0.05;
        DS.algorithm.sinusPlane(plane, accuracy, accuracy, fase);

        //tilt shift
        currentBlur = targetBlur - ((targetBlur-currentBlur)*0.1);
        if(currentBlur <0.2) currentBlur = 0.2;
        if(currentBlur >0.8) currentBlur = 0.8;
        FX.setBlur(5, currentBlur);

        //camera.position.y = range(mouse.y/window.innerHeight);
        camera.lookAt( mesh.position );

        //render to screen
        // renderer.render( scene, camera );
        FX.render( delta );

    });

    //outro animation
    this.outro = function(){

        this
            .animate(camera.position,'y')
            .time(2500)
            .to(-50)
            .start();

        //todo show options menu

    }

    element.addEventListener('mousemove',function(evt){
        mouse.x = evt.screenX;
        mouse.y = evt.screenY;
        targetBlur = 1-(mouse.y/window.innerHeight)
    });

}

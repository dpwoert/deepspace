DS.visualisations.aqua3d = function(element, network){

    //render
    DS.THREE.renderManager.call(this);

    //add camera
    this.camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    //add render canvas
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    element.appendChild(renderer.domElement);

    //add scene
    this.scene = new THREE.Scene(); //add fog?

    //create geometries
    var node = new THREE.IcosahedronGeometry(25, 1);
    var message = new THREE.IcosahedronGeometry(5, 1);

    //import lightsBuffer to animate light pulses
    this.lights = new DS.THREE.LightsBuffer(scene);

    //hemisphere light - lighter when no light pulses
    var intensity = this.lights.usingPulses() ? 0.7 : 1;
    var hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, intensity);
    scene.add(hemisphere);

    //create force
    var force = new DS.THREE.ForceGraph(network, scene);

    this.addProcess('aqua3d', function(delta){



    })

}

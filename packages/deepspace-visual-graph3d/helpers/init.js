helpers.init = function(element){

    //add camera
    this.camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    //add render canvas
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    element.appendChild(this.renderer.domElement);

    //add scene
    this.scene = new THREE.Scene(); //add fog?

}

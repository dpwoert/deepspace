helpers.init = function(element){

    //add camera
    this.camera = new helpers.rotationCamera(this);

    //add render canvas
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    element.appendChild(this.renderer.domElement);

    //add scene
    this.scene = new THREE.Scene(); //add fog?

}

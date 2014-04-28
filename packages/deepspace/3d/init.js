DS.THREE.init = function(){

    //add camera
    this.camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    //add render canvas
    var $e = $('body .visualization');
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( $e.width(), $e.height() );
    $e.append( this.renderer.domElement );

    //add scene
    this.scene = new THREE.Scene(); //add fog?

}

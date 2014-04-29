DS.THREE.controls = function(){

    this.controls = new THREE.FlyControls( this.camera );

    this.controls.movementSpeed = 250;
    this.controls.domElement = this.renderer.domElement;
    this.controls.rollSpeed = Math.PI / 6;
    this.controls.autoForward = false;
    this.controls.dragToLook = false;

}

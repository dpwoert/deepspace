DS.THREE.FXlib.tiltShift = function(){

    //check
    if(!this.composer){
        console.warn('composer not found');
        return false;
    }

    //options
    this.setBlur = function(blur, point){

        var bluriness = blur;

        this.hblur.uniforms['h'].value = bluriness / window.innerWidth;
        this.vblur.uniforms['v'].value = bluriness / window.innerHeight;
        this.hblur.uniforms['r'].value = this.vblur.uniforms['r'].value = point;

    };

    //init
    this.hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
    this.vblur = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
    this.setBlur(5, 0.6);

    this.composer.addPass(this.hblur);
    this.composer.addPass(this.vblur);


}

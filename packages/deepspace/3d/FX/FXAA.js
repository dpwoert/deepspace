DS.THREE.FXlib.FXAA = function(){

    //check
    if(!this.composer){
        console.warn('composer not found');
        return false;
    }

    //FXAA - AntiAliasing
    this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;
    this.effectFXAA.uniforms['resolution'].value.set(1 / (width * this.dpr ), 1 / (height * this.dpr ));
    this.composer.addPass(this.effectFXAA);

};

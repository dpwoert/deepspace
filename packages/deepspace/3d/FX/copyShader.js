DS.THREE.FXlib.copyShader = function(){

    //check
    if(!this.composer){
        console.warn('composer not found');
        return false;
    }

    //copy pass?
    var copyPass = new THREE.ShaderPass(THREE.CopyShader);
    copyPass.renderToScreen = true;
    this.composer.addPass(copyPass);

};

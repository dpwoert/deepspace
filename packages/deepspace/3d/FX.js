DS.THREE.FX = function(renderer, scene, camera){

    this.dpr = window.devicePixelRatio || 1;

    //Create Shader Passes
    this.composer = new THREE.EffectComposer(renderer);
    this.composer.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);
    this.renderPass = new THREE.RenderPass(scene, camera, null, new THREE.Color(0xFFFFFF));
    this.composer.addPass(this.renderPass);

    //abbility to add FX
    this.add = function(name){
        DS.THREE.FXlib[name].call(this);
        return this; //chainable
    };

    //always add FXAA
    this.add('FXAA');

    this.render = function(delta){
        this.composer.render(delta);
    };

    this.setBackground = function(color){
        this.renderPass.clearColor = color;
    };

    this.resize = function(){
        //on resize
        this.composer.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;
        this.effectFXAA.uniforms['resolution'].value.set(1 / (width * this.dpr ), 1 / (height * this.dpr ));
    };

}

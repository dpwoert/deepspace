DS.THREE.FXlib.filmGrain = function(){

    //check
    if(!this.composer){
        console.warn('composer not found');
        return false;
    }

    //film grain
    var effectFilm = new THREE.FilmPass(0.04, 0, 100, false);
    this.composer.addPass(effectFilm);

};

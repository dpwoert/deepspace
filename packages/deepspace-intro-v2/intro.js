DS.Intro = function(element){

    //initialization of globals
    var voronoi;

    //render loop
    DS.THREE.renderManager.call(this);

    //create voronoi
    voronoi = new DS.algorithm.Voronoi();
    

}

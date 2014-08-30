DS.algorithm.Voronoi = function(nr, width, height){

    //standard nr of point
    nr = nr || 100;

    //sizing
    var fullscreen = width ? false : true;

    //update when needed - and on start
    this.update = function(){

        //resize when needed
        if(fullscreen){
            width = window.innerWidth;
            height = window.innerHeight;
        }

        //create vertices
        var vertices = d3.range(nr).map(function(d) {
            return [Math.random() * width, Math.random() * height];
        });

        //create d3 voronoi
        this.points = d3.geom.voronoi(vertices);

    }.call(this);

}

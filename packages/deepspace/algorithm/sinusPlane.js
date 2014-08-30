DS.algorithm.sinusPlane = function(plane, x, y, fase){

    if(plane instanceof THREE.Mesh){
        console.warn('need geometry');
    }

    //generate heights
    for( var point = 0 ; point < x * y ; point++ ){

        plane.vertices[point].z = Math.random()*60;

    }

    //do update
    plane.verticesNeedUpdate = true;
    plane.computeFaceNormals();


}

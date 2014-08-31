DS.algorithm.sinusPlane = function(plane, x, y, fase){

    var getSinus = function(sx,sy){
        return (Math.sin( ( sx + fase ) * 0.3 ) * 10 ) + ( Math.sin( ( sy + fase ) * 0.5 ) * 15 );
    }

    if(plane instanceof THREE.Mesh){
        console.warn('need geometry');
    }

    //generate randomness
    if(!plane.randomHeights){

        plane.randomHeights = [];
        for ( var i = 0 ; i < x*y ; i++ ){
            plane.randomHeights.push(Math.random()*40)-20;
        }

    }

    //generate heights
    for( var px = 0 ; px < x ; px++ ){

        for( var py = 0 ; py < y ; py++ ){

            var point = py * x + px;
            plane.vertices[point].z = getSinus(px,py) + plane.randomHeights[point];

        }

    }

    //do update
    plane.verticesNeedUpdate = true;
    plane.computeFaceNormals();


}

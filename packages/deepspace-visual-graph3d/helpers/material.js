helpers.material = function(){

    var community = [];
    var communityLight = [];

    //nodes base
    var base = new THREE.MeshLambertMaterial( { 'color': 0xcccccc, 'shading': THREE.FlatShading } );
    var baseLight = new THREE.MeshLambertMaterial( { 'color': 0xccccc, 'shading': THREE.FlatShading, 'opacity': 0.3, 'transparent': true } );

    //create all coloured materials
    for ( var i = 0 ; i < Settings.colors.nodes.length ; i++ ){

        //normal
        var normal = base.clone();
        normal.color = new THREE.Color( Settings.colors.nodes[i] );

        //light
        var light = baseLight.clone();
        light.color = new THREE.Color( Settings.colors.nodes[i] );

        //save
        community.push(normal);
        communityLight.push(light);
    }

    //lines
    var line = new THREE.LineBasicMaterial( { 'color': 0xa4b2c1, 'fog': false, 'linewidth': 0.005, 'opacity': 0.2, 'transparent': true } );
    var lineLight = new THREE.LineBasicMaterial( { 'color': 0xa4b2c1, 'fog': false, 'linewidth': 0.005, 'opacity': 0.1, 'transparent': true } );
    var lineHeavy = new THREE.LineBasicMaterial( { 'color': 0xa4b2c1, 'fog': false, 'linewidth': 0.005, 'opacity': 1, 'transparent': true } );

    this.getNode = function(group, type){

        //return last when above max. amount of community colors
        if(group >= Settings.colors.nodes.length){
            group = Settings.colors.nodes.length-1;
        }

        switch(type){
            case 'light': return communityLight[group];
            default: return community[group];
        }

    };

    this.getLink = function(type){

        switch(type){
            case 'light': return lineLight;
            case 'heavy': return lineHeavy;
            default: return line;
        }

    };

}

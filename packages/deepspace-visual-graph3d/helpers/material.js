helpers.material = function(){

    var community = [];
    var communityLight = [];

    //nodes base
    var base = new THREE.MeshLambertMaterial( { 'color': 0xcccccc, 'shading': THREE.FlatShading } ) );
    var baseLight = new THREE.MeshLambertMaterial( { 'color': 0xccccc, 'shading': THREE.FlatShading, 'opacity': 0.3, 'transparent': true } ) );

    //create all coloured materials
    for ( var i = 0 ; i < Settings.colors.nodes.length ; i++ ){

        //normal
        var normal = base.clone();
        normal.color = Settings.colors.nodes[i];

        //light
        var light = base.clone();
        light.color = Settings.colors.nodes[i];

        //save
        community.push(normal);
        communityLight.push(light);
    }

    //lines
    //TODO

    this.getNode = function(community){

    }
}

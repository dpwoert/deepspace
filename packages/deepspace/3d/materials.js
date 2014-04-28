DS.THREE.material = function(){

    //nodes
    this.nodes = [];
    this.nodesLight = [];

    for(var i = 0 ; i < DS.maxGroups ; i++){
        var nodeColor = (i>=DS.maxGroups) ? 0xCCCCCC : DS.colors.nodes[i];
        this.nodes.push(new THREE.MeshLambertMaterial( { 'color': nodeColor, 'shading': THREE.FlatShading } ) );
        this.nodesLight.push(new THREE.MeshLambertMaterial( { 'color': nodeColor, 'shading': THREE.FlatShading, 'opacity': 0.3, 'transparent': true } ) );
    }

    //lines
    this.line = new THREE.LineBasicMaterial( { 'color': DS.colors.line, 'fog': false, 'linewidth': 0.005, 'opacity': 0.2, 'transparent': true } );
    this.lineLight = new THREE.LineBasicMaterial( { 'color': DS.colors.line, 'fog': false, 'linewidth': 0.005, 'opacity': 0.1, 'transparent': true } );
    this.lineHeavy = new THREE.LineBasicMaterial( { 'color': DS.colors.line, 'fog': false, 'linewidth': 0.005, 'opacity': 1, 'transparent': true } );

    //messages
    this.messages = {};
    _.each(DS.colors.messages, function(val, key){
        this.messages[key] = new THREE.MeshLambertMaterial( { 'color': val, 'shading': THREE.FlatShading } );
    }.bind(this));

}

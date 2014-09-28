helpers.geometries = function(){

    var node = new THREE.IcosahedronGeometry(2.5, 1);
    var message = new THREE.IcosahedronGeometry(1, 1);

    this.getNode = function(){
        return node;
    }

    this.getMessage = function(){
        return message;
    }

    this.getLink = function(person1, person2){

        var geometry = new THREE.Geometry();

    	//positions
    	var source = new THREE.Vector3(person1.x, person1.y, person1.z);
    	var target = new THREE.Vector3(person2.x, person2.y, person2.z);

        //add vertices
        geometry.vertices.push( source , target );
        return geometry;

    }

}

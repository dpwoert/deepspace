window.back = {};

back.init = function(){
	var geom = new THREE.CubeGeometry(90000,90000,90000);
	var material = new THREE.MeshLambertMaterial( { color: 0x333333 } );
	back.mesh = new THREE.Mesh( geom , material );

	// The bg plane shouldn't care about the z-buffer.
	back.mesh.material.depthTest = false;
	back.mesh.material.depthWrite = false;

	//DDD.scene.add(back.mesh);
}
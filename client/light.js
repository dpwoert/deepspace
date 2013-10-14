window.light = {};

light.init = function(){

	//ambient
	// var ambientLight = new THREE.AmbientLight(0x222222);
 //    DDD.scene.add(ambientLight);

	// //directional
	// var directionalLight = new THREE.DirectionalLight(0xffffff);
 //    directionalLight.position.set(1, 1, 1).normalize();
 //    DDD.scene.add(directionalLight);

 	var intensity = DDD.lightPulses ? 0.7 : 1;
 	hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, intensity);
 	DDD.scene.add(hemisphere);

}
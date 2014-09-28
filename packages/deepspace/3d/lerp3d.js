DS.THREE.lerp3d = function(from, to, completed, ease){

    if(!ease) ease = 'easeInOutCubic';

	return new THREE.Vector3(
		Math[ease](completed, from.x, to.x-from.x, 1),
		Math[ease](completed, from.y, to.y-from.y, 1),
		Math[ease](completed, from.z, to.z-from.z, 1)
	);
}

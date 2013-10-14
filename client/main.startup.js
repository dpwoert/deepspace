window.data = {};

//start script
Meteor.startup(function(){
	intro.init();
});


window.loadMain = function(){

	//get data
	var get = [
		facebook.getFriends,
		facebook.getFriendRelations,
		facebook.getLikes,
		facebook.getPosts
	];

	//prepare data for visualisation
	var prepare = [
		graph.compareFriends,
		graph.compareLikes,
		graph.makeForce,
		graph.makeCommunities,
		timeline.make3D,
		cache.saveCache,
		intro.hide
	];

	//start visualisation
	start = DDD.init;

	//check if cached to prevent facebook call
	get = cache.check(get);

	//connect to facebook
	facebook.retrieve(get, prepare, start);
	facebook.connect();

};
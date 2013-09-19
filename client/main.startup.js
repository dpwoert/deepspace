window.data = {};

//start script
Meteor.startup(function(){

	//get data
	var get = [
		facebook.getFriends,
		facebook.getFriendRelations,
		//facebook.getLikes
	];

	//prepare data for visualisation
	var prepare = [
		graph.compareFriends,
		//graph.compareLikes,
		graph.makeForce,
		graph.makeCommunities
	];

	//start visualisation
	start = DDD.init;

	//connect to facebook
	facebook.retrieve(get, prepare, start);
	facebook.connect();

});
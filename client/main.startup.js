window.data = {};

//start script
Meteor.startup(function(){

	//get data
	var fnFacebook = [
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
		timeline.init,
		timeline.make3D,
		//cache.saveCache,
	];

	//start visualisation
	start = DDD.init;

	//check if cached to prevent facebook call
	//fnFacebook = cache.check(fnFacebook);

	//intro button
	intro.handle = function(){

		//make facebook connection
		facebook.load(fnFacebook, function(){ intro.done = true; });

	};

	intro.hide = function(){

		//launch app
		launch(prepare, start);

	}

	//add FB api
	//facebook.connect();

	//start with intro
	intro.init();


});

window.launch = function(prepare, start){

	//start preparation [array]
	$.each(prepare, function(k, handler){
		if( $.isFunction(handler) ) handler();
	});

	//[single function]
	if( $.isFunction(prepare) ) handler();

	//start visualisation
	start();

}

//start script
Meteor.startup(function(){

	//start d3
	graph.init();
	
	//connect to facebook
	// facebook.retrieve([ facebook.getFriends, facebook.getFriendRelations, facebook.getLikes ], graph.build );
	facebook.retrieve([ facebook.getFriends, facebook.getFriendRelations ], graph.makeForce );
	facebook.connect();
	//DDD.init();

});
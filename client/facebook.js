window.facebook = {};
facebook.appId = 289032171239738;
facebook.busy = 0;

//1479552728?fields=interested_in,likes,last_name [get likes]

facebook.connect = function(){
	FB.init({
        appId:  facebook.appId,
        status: true,
        cookie: true,
        xfbml:  true
    });

	FB.login(function(response) {
        if (!response.authResponse) {
            console.error('Geen toestemming om in te loggen op Facebook');
        } else{
        	console.log('ingelogd op facebook');
        	facebook.loginSucces(true);
        }
    }, {scope: 'friends_likes,user_likes,read_friendlists,email,read_stream'});
};

facebook.retrieve = function(list, handler){

	facebook.loginSucces = function(first){
		//get data from facebook and callback when ready
		$.each(list, function(key, item){
			if(first){ item(); }
		});

		//check for succes
		if(facebook.busy > 0){
			document.title = 'loading: ' + facebook.busy;
			window.setTimeout(function(){ facebook.loginSucces(false) }, 50);
		} else {
			document.title = 'Facebook visualizer';
			handler();
		}
	}

}

facebook.getFriends = function(){
	//add task
	facebook.busy++;

	FB.api('/me/friends', function(response) {

		console.log(response);

		//make id's array keys
		facebook.friends = response.data.reduce(function(acc, x) {
            acc[x.id] = x.name;
            return acc;
        }, {});

        console.log('got my friendlist from FB');
        console.log(facebook.friends);

        //delete task
        facebook.busy--;

	});
};

facebook.getFriendRelations = function(){
	//add task
	facebook.busy++;

	FB.api('/fql?q=' +
    escape('SELECT uid1, uid2 FROM friend ' +
		'WHERE ' +
		'uid1 IN (SELECT uid2 FROM friend WHERE uid1=me()) AND ' + 
		'uid2 IN (SELECT uid2 FROM friend WHERE uid1=me())'), function(response) {

    	facebook.friendRelations = response.data;

    	//delete task
    	facebook.busy--;
    });
};

facebook.getLikes = function(){

	//check if friendlist is in
	if(!facebook.friends) {
		window.setTimeout(facebook.getLikes, 500);
		return false;
	}

	facebook.likes = {};

	//get all the likes
	$.each(facebook.friends, function(key, value){
		
		//start process
		facebook.likes[key] = [];
		var url = '/'+key+'?fields=likes';

		function retrieve(url, first){

			facebook.busy ++;

			FB.api(url, function(response) {

				console.log(url);
				console.log(response);

				facebook.busy --;

				//only if likes
				if(response.likes){
					facebook.likes[key] = facebook.likes[key].concat(response.likes.data);
				}
				//paging doesn't sent like object... stupid
				if(!first && response.data){
					facebook.likes[key] = facebook.likes[key].concat(response.data);
				}
					
				//add paging
				if(first && response.likes.paging.next){
					retrieve(response.likes.paging.next, false);
				}
				else if(!first && response.paging.next){
					retrieve(response.paging.next, false);
				}

			});
		}

		retrieve(url, true);

	});

};

facebook.compareLikes = function(uid1, uid2, start, multiplyer){
	var likes1 = facebook.likes[uid1];
	var likes2 = facebook.likes[uid2];
	var likeable = 0;

	$.each(likes1, function(key, value){
		$.each(likes2, function(key2, value2){
			if(value.id == value2.id){
				likeable ++;
			}
		});
	});

	var result = start - (likeable * multiplyer);
	if(result < 20) result=20;
	console.log(likeable + ' | ' + result + ' | ' + uid1 + ' likes ' + uid2);

	return result;
}

facebook.getCommunity = function(){

	//https://github.com/upphiminn/jLouvain/blob/master/jLouvain.js

	var node_data = [];
	var edge_data = [];
	
	$.each(graph.force.nodes(), function(k, v){
		node_data.push(v.index);
	});

	$.each(graph.force.links(), function(k, v){
		edge_data.push( {source: v.source.index, target: v.target.index, weight: 10.0}) ;
	});


	var community = jLouvain().nodes(node_data).edges(edge_data).partition_init();
	facebook.community = community();
}
window.facebook = {};

//settings
facebook.appId = 289032171239738;
facebook.busy = 0;

//dates
facebook.from = new Date();
facebook.from = Math.round(facebook.from.setMonth(facebook.from.getMonth() - 1)/1000);
//facebook.from = Math.round(facebook.from.getTime() / 1000);
facebook.until = Math.round(new Date().getTime()/1000);

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

facebook.load = function(list, after){

	facebook.connect();

	facebook.loginSucces = function(first){
		//get data from facebook and callback when ready
		$.each(list, function(key, item){
			if(first){ item(); }
		});

		//check for succes
		if(facebook.busy > 0){
			window.setTimeout(function(){ facebook.loginSucces(false) }, 50);
		} else {
			after();
		}
	}

}

facebook.getFriends = function(){
	//add task
	facebook.busy++;

	FB.api('/me/friends', function(response) {

		console.log(response);

		//make id's array keys
		data.friends = response.data.reduce(function(acc, x) {
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

    	data.friendRelations = response.data;

    	//delete task
    	facebook.busy--;
    });
};

facebook.getLikes = function(){

	//check if friendlist is in
	if(!data.friends) {
		window.setTimeout(facebook.getLikes, 500);
		return false;
	}

	data.likes = {};

	//get all the likes
	$.each(data.friends, function(key, value){
		
		//start process
		data.likes[key] = [];
		var url = '/'+key+'?fields=likes.limit(100)';

		function retrieve(url, first){

			facebook.busy ++;

			FB.api(url, function(response) {

				console.log(url);
				console.log(response);

				facebook.busy --;

				//error?
				if(response.error){
					console.warn(response.error);
					return false;
				}

				//only if likes
				if(response.likes){
					data.likes[key] = data.likes[key].concat(response.likes.data);
				}
				//paging doesn't sent like object... stupid
				if(!first && response.data){
					data.likes[key] = data.likes[key].concat(response.data);
				}
					
				//add paging
				if(first && response.likes && response.likes.paging && response.likes.paging.next){
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

facebook.getPosts = function(){

	//check if friendlist is in
	if(!data.friends) {
		window.setTimeout(facebook.getPosts, 500);
		return false;
	}

	data.posts = {};

	//get all the posts
	$.each(data.friends, function(key, value){
		
		//start process
		data.posts[key] = [];
		var url = '/'+key+'?fields=posts.fields(id,name,caption,description,type,created_time).since('+facebook.from+').until('+facebook.until+')';

		function retrieve(url, first){

			facebook.busy ++;

			FB.api(url, function(response) {

				console.log(url);
				console.log(response);

				facebook.busy --;

				//error?
				if(response.error){
					console.warn(response.error);
					return false;
				}

				//only if likes
				if(response.posts){
					data.posts[key] = data.posts[key].concat(response.posts.data);
				}
				//paging doesn't sent like object... stupid
				if(!first && response.data){
					data.posts[key] = data.posts[key].concat(response.data);
				}
					
				//add paging
				if(first && response.posts && response.posts.paging && response.posts.paging.next){
					//retrieve(response.posts.paging.next, false);
				}
				else if(!first && response.paging.next){
					//retrieve(response.paging.next, false);
				}

			});
		}

		retrieve(url, true);

	});

}

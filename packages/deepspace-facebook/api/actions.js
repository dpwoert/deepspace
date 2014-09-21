DS._FB_ACTIONS = {

    getFriends: function(promise, data, options){

        FB.api('/me/friends/', function(response) {

            //error?
            if(response.error){
                console.warn(response.error);
                //facebook.error(response.message, response.code);
                return false;
            }

            //make array
            data.friends = response.data.map(function(friend){
                friend.id = +friend.id;
                return friend;
            });

            //done
            promise.resolve(data);

        });

    },

    getFriendRelations: function(promise, data, options){

        FB.api('/fql?q=' +
        escape('SELECT uid1, uid2 FROM friend ' +
            'WHERE ' +
            'uid1 IN (SELECT uid2 FROM friend WHERE uid1=me()) AND ' +
            'uid2 IN (SELECT uid2 FROM friend WHERE uid1=me())'), function(response) {

            //error?
            if(response.error){
                console.warn(response.error);
                //facebook.error(response.message, response.code);
                return false;
            }

            var relations = response.data;
            //sort all relations
            // for( var i = 0 ; i < relations.length ; i++ ){
            //     var rel = relations[i];
            //
            //     //find source
            //     for(var j = 0 ; j < data.length ; j++){
            //         var person = data[j];
            //
            //         //found
            //         if(person.id == rel.uid1){
            //             if(!person.relations) person.relations = [];
            //             person.relations.push(+rel.uid2);
            //         }
            //
            //     }
            //
            // }

            data.relations = relations;

            //done
            promise.resolve(data);

        });

    },

    getLikes: function(promise, data, options){

        var url = '/me/friends/';
        url += '?fields=likes.limit(100)';

        FB.api(url, function(response) {

            //error?
            if(response.error){
                console.warn(response.error);
                return false;
            }

            //add data to correct person
            data = options.FBsort(response.data, data.friends, 'likes');

            //done
            promise.resolve(data);

        });

    },

    getPosts: function(promise, data, options){

        var limit = options.limit || 200;

        //get url
        var url = 'me/home?fields=created_time,place,to,from,likes,comments&limit=' + limit;

        //get part of posts
        var callApi = function(url){

            console.log('get posts');

            FB.api(url, function(response) {

                //error?
                if(response.error){
                    console.error('error when retrieving posts', response);
                    return false;
                }

                //add data
                if(_.isArray(response.data)){

                    //merge or create
                    if(data.posts){
                        data.posts = data.posts.concat(response.data);
                    } else {
                        data.posts = response.data;
                    }


                } else {
                    console.error('post data not correct', response);
                }

                //check if more calls need to be made
                if(response.paging && response.paging.next && data.posts.length < limit){

                    //next call
                    callApi(url);

                } else {

                    //done
                    promise.resolve(data);

                }


            });

        };

        //do call
        callApi(url);

    }

};

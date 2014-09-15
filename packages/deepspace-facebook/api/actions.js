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

        //js date to FB date
        // options.from = Math.round(+options.from/1000);
        // options.until = Math.round(+options.until/1000);
        var until = new moment();
        var from = new moment().subtract(3, 'days');

        //todo split into parts of 5 days
        var calls = [];

        //get url
        var url = '/v2.1/me/home';
        // url += '?fields=posts.fields(id,name,caption,description,type,created_time)';
        // url += '?fields=posts';
        // url += '.since('+(since/1000)+').until('+(until/1000)+')';

        //get part of posts
        var callApi = function(url){

            console.log('get posts start', url);

            FB.api(url, function(response) {

                //error?
                if(response.error){
                    console.error('error when retrieving posts', response);
                    return false;
                }

                console.log('got posts',response);

                //add data to correct person
                //data = options.FBsort(response.data, data.friends, 'posts');

                //done when last call
                //callApi(url)

                //all done?
                promise.resolve(data);

            });

        };

        //do call
        callApi(url);

    }

};

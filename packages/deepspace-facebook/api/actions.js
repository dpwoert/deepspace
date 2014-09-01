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

        //todo split into parts of 5 days
        var calls = [];
        var dayLength = 5;
        var parts = Math.ceil(this.days/dayLength);

        //split dates
        var until = Date.now();
        for ( var i = 0 ; i < parts ; i++){

            //promise part
            var def = Q.defer();
            calls.push(def)

            //get part
            var since = until.setDate( until.getDate() - 5 );
            getPart(since, until, def)

            //save for next run
            until = minus;
        }

        //get url
        var url = '/me/friends/';
        url += '?fields=posts.fields(id,name,caption,description,type,created_time)';

        //get part of posts
        var getPart = function(since,until,promisePart){

            var url2 = url + '.since('+since+').until('+until+').limit(15)';
            // url += '.limit(50)';

            FB.api(url2, function(response) {

                //error?
                if(response.error){
                    console.warn(response.error);
                    return false;
                }

                //add data to correct person
                data = options.FBsort(response.data, data.friends, 'posts');

                //done when last call
                promisePart.resolve();

            });

        };

        //all done?
        Q.all(calls).then(function(){
            promise.resolve(data);
        });

    }

};

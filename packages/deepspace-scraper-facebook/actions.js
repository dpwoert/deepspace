DS._FB_ACTIONS = {

    getFriends: function(promise, data, options){

        FB.api('/me/friends/', function(response) {

            //error?
            if(response.error){
                console.warn(response.error);
                //facebook.error(response.message, response.code);
                return false;
            }

            //make id's array keys
            data = response.data.reduce(function(acc, x) {
                acc[x.id] = {name: x.name, relations:[] };
                return acc;
            }, {});

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

            //data.friendRelations = response.data;
            var relations = response.data;
            for( var i = 0 ; i < relations.length ; i++ ){
                var rel = relations[i];

                //save
                if(!data[rel.uid1].relations) data[rel.uid1].relations = [];
                data[rel.uid1].relations.push({
                    source: rel.uid1,
                    target: rel.uid2
                });
            }

            //done
            promise.resolve(data);

        });

    },

    getLikes: function(promise, data, options){

        var url = '/me/friends/';
        url += '?fields=likes.limit(100)';
        //url += ',posts.fields(id,name,caption,description,type,created_time)';
        //url += '.since('+options.from+').until('+options.until+')';

        FB.api(url, function(response) {

            //error?
            if(response.error){
                console.warn(response.error);
                return false;
            }

            //add data to correct person
            data = options.FBsort(response.data, data, 'likes');

            //done
            promise.resolve(data);

        });

    },

    getPosts: function(promise, data, options){

        //js date to FB date
        options.from = Math.round(+options.from/1000);
        options.until = Math.round(+options.until/1000);
        console.log(options);

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
            var since = last.setDate( last.getDate() - 5 );
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
                data = options.FBsort(response.data, data, 'posts');

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

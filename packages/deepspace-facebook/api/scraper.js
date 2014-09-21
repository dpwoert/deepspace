Scraper.Facebook = function(){

    var APIurl = 'https://connect.facebook.net/en_US/all.js';
    var appId = Scraper.isLocal ? 1548780815344990 : 1424128567810216;
    var scope = 'read_friendlist';

    //get actions
    var actions = DS._FB_ACTIONS;
    DS._FB_ACTIONS = null;

    //start proces
    this.init = function(scopeChange){

        //promise
        var deferred = Q.defer();

        //scope change?
        scope = scopeChange || scope;

        //load external FB api tools
        Meteor.loadScript(APIurl).then(function(){

            if(!FB){
                console.warn('Facebook API not loaded');
            }

            //api loaded now sign in
            FB.init({
                appId:  appId,
                status: true,
                // cookie: true,
                xfbml:  true
            });

            deferred.resolve();

        });

        //promise
        return deferred.promise;

    };

    //login
    this.login = function(){

        //promise
        var deferred = Q.defer();

        console.log('Start of login');

        FB.login(function(response) {
            if (!response.authResponse) {
                console.error('No acces to FB');
                Session.set('acces-denied', true);
            } else{
                console.log('signed in to facebook');

                //meteor template handles
                Session.set('acces-denied', false);
                Session.set('signed-in', true);

                //done with promise
                deferred.resolve();
            }
        },{
            scope: scope,
            return_scopes: true
        });

        //promise
        return deferred.promise;

    };

    var methods = {};
    methods.FBsort = function(data, saveTo, key){

        for( var i = 0 ; i < data.length ; i++ ){
            var row = data[i];
            if(data[i][key]){

                //find person
                var person = false;
                for( var j = 0 ; j < data.length ; j++ ){
                    if(data[j].id == row.id){
                        person = j;
                    }
                }


                //key already exists
                if(saveTo[person][key]){

                    // var d = data[i][key].data;
                    // for( var j = 0 ; j < data[i][key].data.length ; j++){
                    //     saveTo[person][key].push(d[j]);
                    // }

                    saveTo[person][key] = saveTo[person][key].concat(data[i][key].data)

                }

                //new key for person
                else {
                    saveTo[person][key] = data[i][key].data;
                }
            }
        }

        return saveTo;

    };

    var getMessageData = function(post){

        return {
            type: post.type,
            // comments: post.comments.length,
            // likes: post.likes.length,
            created: post.created_time
        };

    }

    this.messageSort = function(post){

        var message;

        //create time
        var time = new DS.classes.Time();
        time.setTTL( moment(post.created_time) );

        //create
        message = new DS.classes.Message({
            'time': time,
            'data': getMessageData(post)
        });

        //get sender
        var sender = this.findPerson('id', post.from.id);

        //prevent and remove spam
        if(!sender) return false;

        //directed message or not?
        if(post.to){

            var receiver = this.findPerson('id', post.to.id);
            var relation = this.findRelation(sender, receiver);

            //reversed?
            var reversed = relation.checkReversed(sender);

            //add relation
            message.addRelation(relation, reversed);

        } else {

            //get receivers - messages sent publicly - so all friends
            var receivers = this.getRelations(sender);

            //add
            for( var i = 0 ; i < receivers.length ; i++ ){

                var relation = receivers[i];
                var reversed = relation.checkReversed(sender);

                message.addRelation(relation, reversed);

            }

        }

        //return message
        return message;

    };

    var chain = {};
    chain.action = function(name, options){

        //promises
        var oldPromise = this.promise;
        var def = Q.defer();
        this.promise = def.promise;

        //extra methods via options
        options = options || {};
        options = _.extend(options, methods);

        //action
        var _action = function(data){

            console.log('retrieving: ' + name);
            actions[name](def, data, options);

        }.bind(this);

        //deferred?
        if(oldPromise){

            oldPromise.then(function(data){
                _action(data);
            }).catch(console.log);

        } else {
            _action({});
        }

        return this;

    }

    chain.end = function(end){

        this.promise.then(function(data){
            end(data);
        });

    }

    this.chain = function(){

        //make chain
        return chain;

    }

};

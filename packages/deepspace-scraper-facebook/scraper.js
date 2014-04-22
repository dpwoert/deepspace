scrapers.Facebook = function(){

    var APIurl = 'https://connect.facebook.net/en_US/all.js';
    var appId = scrapers.isLocal ? 289032171239738 : 1424128567810216;
    var scope = 'read_friendlist';

    //get actions
    var actions = DS._FB_ACTIONS;
    delete DS._FB_ACTIONS;

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
                cookie: true,
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
        }, {scope: 'friends_likes,user_likes,read_friendlists,email,read_stream'});

        //promise
        return deferred.promise;

    };

    var methods = {};
    methods.FBsort = function(data, saveTo, key){

        for( var i = 0 ; i < data.length ; i++ ){
            var row = data[i];
            if(data[i][key]){

                //key already exists
                if(saveTo[row.id][key]){

                    var d = data[i][key].data;
                    for( var j = 0 ; j < data[i][key].data.length ; j++){
                        saveTo[row.id][key].push(d[j]);
                    }

                }

                //new key for person
                else {
                    saveTo[row.id][key] = data[i][key].data;
                }
            }
        }

        return saveTo;

    }

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

var test = new scrapers.Facebook();

//test API stuff
test
    .init('friends_likes,user_likes,read_friendlists,email,read_stream')
    .then(function(){

        //sign in when connected [for now]
        return test.login();

    })
    .then(function(){

        //date - 20 days
        var date = {}
        date.until = new Date();
        date.from = new Date();
        date.from = date.from.setDate( date.from.getDate() - 5 );

        //get data
        test.chain()
            .action('getFriends')
            .action('getFriendRelations')
            .action('getLikes')
            .action('getPosts', date)
            .end(function(data){
                console.log('end', data);

                var network = new DS.classes.Network();
                network.addPersons(data);
                network.relate();

            });

    }).catch(function(e){
        console.warn(e.stack);
    });

DS.providers.facebook = function(){

    //main promise
    var deferred = Q.defer();

    //init network
    var network = new DS.classes.Network();

    //compare likes
    network.connectivity = function(person1, person2, data){

        //todo

        //compare
        return 10;

    };

    //get the data
    var API = new scrapers.Facebook();

    API
        .init('friends_likes,user_likes,read_friendlists,email,read_stream')
        .then(function(){

            //sign in when connected [for now]
            return API.login();

        })
        .then(function(){

            //get posts from 20 days
            var posts = {
                days: 20
            }

            //get data
            API.chain()
                .action('getFriends')
                .action('getFriendRelations')
                // .action('getLikes')
                .action('getPosts', posts)
                .end(function(data){

                    console.log('got FB data');

                    //got facebook data
                    network
                        .addPersons(data.friends)
                        .addRelations(data.relations, 'id')
                        .identifyGroup(DS.algorithm.louvain)
                        .makeGraph()

                    //finished
                    deferred.resolve(network);

                    console.log('network',network);

                    //var engine = new DS.classes.Engine(network);
                    //console.log(engine);

                });

        }).catch(function(e){
            console.warn(e);
        });

    return deferred.promise;

};

//create provider
DS.providers.facebook = {};

//visualisation types supported
DS.providers.facebook.visualisations = ['aqua3d'];

//getting network
DS.providers.facebook.network = function(){

    //main promise
    var deferred = Q.defer();

    //init network
    var network = new DS.classes.Network();

    //compare likes
    network.connectivity = function(person1, person2, data){

        //not extended so return standard variable
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

                    //finished
                    deferred.resolve(network);

                });

        }).catch(function(e){
            console.warn(e);
        });

    return deferred.promise;

};
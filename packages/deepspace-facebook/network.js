//create provider
Provider.facebook = {
    name: 'Facebook',
    signIn: true,
    visualisations: ['graph3d']
};

//getting network
Provider.facebook.network = function(){

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
    var API = new Scraper.Facebook();

    API
        .init('public_profile, basic_info, email, user_friends, read_stream')
        // .init('friends_likes,read_friendlists,friend_status')
        .then(function(){

            //sign in when connected
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

                    //got facebook data
                    network
                        .addPersons(data.friends)
                        .addRelations(data.relations, 'id')
                        .identifyGroup(DS.algorithm.louvain)
                        //.convertMessages(data.posts, API.convertMessages);

                    //finished
                    deferred.resolve(network);

                });

        }).catch(function(e){
            console.warn(e);
        });

    return deferred.promise;

};

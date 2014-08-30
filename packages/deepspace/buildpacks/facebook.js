DS.buildpacks.Facebook = function(){

    //init network
    var network = new DS.classes.Network();

    //compare likes
    network.connectivity = function(person1, person2, data){

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

                    console.log('end', data);

                    //got facebook data
                    network
                        .addPersons(data)
                        .makeGraph()
                        .identifyGroup(DS.algorithm.louvain)

                    console.log('made network');

                    var engine = new DS.classes.Engine(network);

                    console.log(engine);

                });

        }).catch(function(e){
            console.warn(e);
        });

};

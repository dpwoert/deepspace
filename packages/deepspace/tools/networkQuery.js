DS.tools.NetworkQuery = function(population, relations){

    this.findPerson = function(where,is){

        //loop through whole population and check
        for( var i = 0 ; i < population ; i++ ){

            if( population[i][where] == is ){
                return population[i];
            }

        }

    };

    this.findConnection = function(where,is){

    };

    this.filter = function(filter){

    };

}

DS.tools.NetworkQuery = function(population, relations){

    this.findPerson = function(where,is){

        //loop through whole population and check
        for( var i = 0 ; i < population.length ; i++ ){

            if( population[i][where] == is ){
                return population[i];
            }

        }

    };

    this.getRelations = function(person){

        //init
        check(person, DS.classes.Person);
        var found = [];

        //searching
        for( var i = 0 ; i < population.length ; i++ ){

            if( population[i].source == person || population[j].target ){
                found.push(person);
            }

        }

        return found;

    };

    this.filter = function(filter){

    };

}

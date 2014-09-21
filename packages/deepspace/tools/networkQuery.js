DS.tools.NetworkQuery = function(population, relations){

    this.findPerson = function(where,is){

        //loop through whole population and check
        for( var i = 0 ; i < population.length ; i++ ){

            if( population[i][where] == is ){
                return population[i];
            }

        }

    };

    this.findRelation = function(person1, person2){

        //searching
        for( var i = 0 ; i < relations.length ; i++ ){

            if(
                (relations[i].source == person1 || relations[i].target == person2) ||
                (relations[i].source == person2 || relations[i].target == person1)
            ){
                return relations[i];
            }

        }

        //not found
        return false;

    };

    this.getRelations = function(person){

        //init
        check(person, DS.classes.Person);
        var found = [];

        //searching
        for( var i = 0 ; i < population.length ; i++ ){

            if( relations[i].source == person || relations[i].target == person ){
                found.push( relations[i] );
            }

        }

        return found;

    };

    this.filter = function(filter){

    };

}

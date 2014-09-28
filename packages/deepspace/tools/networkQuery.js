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

    this.getRelations = function(person, biDirectional){

        //init
        check(person, DS.classes.Person);
        var found = [];
        biDirectional = biDirectional || false;

        //searching
        for( var i = 0 ; i < relations.length ; i++ ){

            debugger

            //bi-directional
            if( biDirectional && (relations[i].source._UID == person._UID || relations[i].target._UID == person._UID) ){
                found.push( relations[i] );
            }

            //single
            if( !biDirectional && relations[i].source._UID == person._UID ){
                found.push( relations[i] );
            }

        }

        return found;

    };

    this.filter = function(filter){

    };

}

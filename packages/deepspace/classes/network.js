DS.classes.Network = function(){

    var population = [];
    var relations = [];

    this.addPerson = function(information){

        //save person
        population.push(information);

    };

    this.addPersons = function(list){

        _.each(list, function(item){
            this.addPerson(item);
        }.bind(this));

    };

    this.relate = function(){

        //loop through all persons
        _.each(population, function(person){

            for( var j = 0 ; j < person.relations.length ; j++ ){

                var relation = person.relations[j];
                var k = 0;
                var found = false;
                while( k < relations.length && !found ){

                    if(
                        relations[k].source == relation.target ||
                        relations[k].target == relation.source
                    ){
                        found = true;
                    }

                    //iterate
                    k++;
                }

                if(!found){
                    relations.push(relation);
                }

            }

        });

    };

    this.communities = function(name){
        if(!name) name = 'louvain';
    };

    this.compareInterest = function(key){

    };

};

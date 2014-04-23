DS.classes.Network = function(){

    var population = [];
    var relations = [];

    this.addPerson = function(information){

        //save person
        population.push(information);

        //chainable
        return this;

    };

    this.addPersons = function(list){

        for(var i = 0 ; i < list.length ; i++){
            this.addPerson(list[i]);
        }

        //chainable
        return this;

    };

    this.connectivity = function(person1, person2, data){
        debugger
        return 10;
    };

    this.identify = function(fn){

        for( var i = 0 ; i < population.length ; i ++){
            population[i] = fn(population[i], relations);
        }

        //chainable
        return this;
    };

    this.identifyGroup = function(fn){

        population = fn(population, relations);

        //chainable
        return this;
    };

    var relate = function(){

        //add all relations
        for( var i = 0 ; i < population.length ; i++ ){

            var rel = population[i].relations;
            if(rel == undefined) rel = [];

            for( var j = 0 ; j < rel.length ; j++ ){

                //find person
                var target;
                for ( var k = 0 ; k < population.length ; k++ ){
                    if(population[k].id == rel[j]){
                        target = k;
                    }
                }

                //todo check if double?

                var connection = this.connectivity(population[i], population[target], population);

                relations.push({
                    'source': i,
                    'target': target,
                    'connection': connection
                });

            }

        }

    };

    this.makeGraph = function(){

        //create network
        relate.call(this);

        console.log('related');

        // Create a force layout to display nodes.
        this.force = d3.layout.force()
            .charge(-300)
            .linkDistance(100)
            //.size(10,10)
            .nodes(population)
            .links(relations)

        this.force.start();

        console.log('force made');

        //chainable
        return this;

    };

};

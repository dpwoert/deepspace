DS.classes.Relation = function(create){

    //check
    check(create, {
        source: DS.classes.Person,
        target: DS.classes.Person,
        connection: Number,
        data: Match.Optional(Object)
    });

    //create
    _.extend(this, create);

    //tools
    this.compare = function(relation, biDirectional){

        check(source, DS.classes.Relation);


        if(!biDirectional){

            //check
            return (
                this.source._id == relation.source._id &&
                this.source._id == relation.source._id
            );

        } else {

            //check bidirectional
            return (
                (this.source._id == relation.source._id &&
                this.source._id == relation.source._id) ||
                (this.source._id == relation.target._id &&
                this.target._id == relation.source._id)
            );

        }

    };

    this.checkReversed = function(source){

        check(source, DS.classes.Person);
        return this.source._id == source._id;

    }

};

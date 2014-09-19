DS.classes.Message = function(create){

    var relations = [];

    //check
    check(create, {
        time: DS.classes.Time,
        data: Match.Optional(Object)
    });

    //create
    _.extend(this, create);

    //add relations
    this.addRelation = function(relation, reversed){

        check(relation, DS.classes.Relation);
        check(reversed, Boolean);

        relations.push({
            'relation': relation,
            'reversed': reversed
        });

    }

};

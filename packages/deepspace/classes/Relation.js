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

};

DS.classes.Message = function(create){

    //check
    check(create, {
        time: DS.classes.Time,
        relation: DS.classes.Relation,
        reverse: Match.Optional(Boolean),
        data: Match.Optional(Object)
    });

    //create
    _.extend(this, create);

};

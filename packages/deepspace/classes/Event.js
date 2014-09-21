DS.classes.Event = function(create){

    var relations = [];

    //check
    check(create, {
        time: DS.classes.Time,
        data: Match.Optional(Object),

        add: Match.Optional(Function),
        remove: Match.Optional(Function),
        update: Match.Optional(Function)
    });

    //create
    _.extend(this, create);
    
};

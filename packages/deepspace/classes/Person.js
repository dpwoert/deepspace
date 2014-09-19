DS.classes.Person = function(create){

    //check
    check(create, Object);

    //make unique
    this._UID = DS.tools.UID();

    //create
    _.extend(this, create);

};

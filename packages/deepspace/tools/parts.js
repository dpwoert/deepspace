var parts = [];
DS.parts = function(list){

    //get list
    if(!list){
        return parts;
    }

    //set list
    else {

        //save
        parts = list;

        //trigger dependency change
        Session.set('parts', Date.now() );

    }

}

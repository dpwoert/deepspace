var network;
var loadNetwork = function(toLoad){

    toLoad().then(function(net){

        //stopped loading
        Session.set('loading', false);
        console.log('network is done loading');

        //save network
        network = net;

    });

};

Template.visualisation.rendered = function(){

    //needs login?
    Session.set('needsLogin', this.data.needsLogin);

    //awaiting network
    Session.set('loading', true);

    if(!this.data.needsLogin){
        loadNetwork(this.data.network);
    }

};

Template.visualisation.needsLogin = function(){
    return Session.get('needsLogin');
};

Template.visualisation.loading = function(){
    return Session.get('loading');
};

Template.visualisation.parts = function(){

    //dependency subscription
    Session.get('parts');

    return DS.parts();
};

Template.visualisation.events({

    'click #login': function(){

        loadNetwork(this.network);
        Session.set('needsLogin', false);
    }

});

Template.canvas.rendered = function(){

    var visualisation;

    //get
    if(!Session.get('visualisation')){
        visualisation = this.data.visualisations[0];
    } else {
        visualisation = Session.get('visualisation');
    }

    //check
    if(!network){
        return false;
    }

    //create
    var element = this.find('.visualisation');
    console.log('load visual');
    Visual[visualisation](element, network);

};

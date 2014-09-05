var network;

Template.visualisation.rendered = function(){

    //awaiting network
    Session.set('loading', true);
    this.data.network.then(function(net){

        //stopped loading
        Session.set('loading', false);

        console.log('network is done loading');

        //save network
        network = net;

    });

};

Template.visualisation.loading = function(){
    return Session.get('loading');
}

Template.canvas.rendered = function(){

    var visualisation;

    //get
    if(!Session.get('visualisation')){
        visualisation = this.data.visualisations[0];
    } else {
        visualisation = Session.get('visualisation');
    }

    //create
    var element = this.find('.visualisation');
    console.log('load visual');
    Visual[visualisation](element, network);

}

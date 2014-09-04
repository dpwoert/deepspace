var intro;

Template.intro.rendered = function(evt, template){

    //create intro visualisation
    var element = this.find('.visualization');
    intro = new DS.Intro(element);
    intro.start();

    console.log(intro);

};

Template.intro.destroyed = function(){
    intro.end();
    intro = null;
}

Template.intro.events({

    'click .logo': function(){

        // intro.outro();
        Router.go('visualisation', { network: 'facebook' });

    }

})

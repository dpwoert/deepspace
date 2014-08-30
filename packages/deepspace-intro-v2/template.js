var intro;

Template.intro.rendered = function(evt, template){

    //create intro visualisation
    var element = this.find('.visualization');
    intro = new DS.Intro(element);
    intro.start();

    console.log(intro);

};

Template.intro.destroyed = function(){
    intro = null;
}

Template.intro.events({

    'click .logo': function(){
        intro.end();
        DS.buildpacks.Facebook();
    }

})

var intro;

Meteor.startup(function(){

    //background visualisation
    intro = new DS.Intro();
    intro.start();

})

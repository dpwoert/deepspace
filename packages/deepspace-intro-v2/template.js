Template.intro.rendered = function(evt, template){

    //create intro visualisation
    var element = this.find('.visualization');
    var intro = new DS.Intro(element);
    intro.start();

}

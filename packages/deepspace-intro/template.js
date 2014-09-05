Template.intro.webGL = function(){
    return Session.get('webGL');
}

Template.intro.quality = function(){
    return Session.get('quality');
}

Template.intro.events({

    'click .login': function(){
        // var viz = new Provider.Facebook();
    }

});

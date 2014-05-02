Meteor.startup(function(){

    //detect support
    Session.set('webGL', Detector.webgl && Detector.workers);
    Session.set('canvas', Detector.canvas);

    //quality
    var quality = (navigator.appVersion.indexOf("Win")!=-1) ? 'medium' : 'high';
    Session.set('quality', quality);

    //mobile?
    Session.set('mobile', (

        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)

    ));

});

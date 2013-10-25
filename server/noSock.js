//heroku has no websocks
if (Meteor.is_server) {
    Meteor.startup(function () {
        process.env.DISABLE_WEBSOCKETS = true;
    });
}
DS.classes.Timeline = function(){

    var events = [];
    var currentTime;

    this.addEvent = function(time, add, remove){

        events.push({
            'time': time,
            'add': add,
            'remove': remove
        });

    };

    this.setBounds = function(from, to){

    };

    this.calculateBounds = function(){

    }

    //manualy set a time
    this.setTime = function(date){

    };

    //move time forward
    this.forward = function(delta){

    };

    this.render = function(){

    };

}

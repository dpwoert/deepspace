//settings
var parts = 25;
var events = [];
var bounds = [];
var sorted = [];
var active = 0;
var partLenght = 0;

var add = function(evt){
    events.push(evt);
};

var sort = function(){

    partLenght = bounds[1] - bounds[0];

    //create parts
    sorted = [];
    for( var p=0 ; p < parts ; p++ ){
        sorted.push([]);
    }

    for ( var i=0 ; i < events.lenght ; i++ ){

        //get time
        var time = events[i].time.get();

        //todo
        self.console.log(time);

    }

}

var update = function(){

}

//actions from main thread
self.addEventListener('message', function(e) {

    //settings
    if(e.parts) parts = e.parts;
    if(e.bounds) {
        bounds = e.bounds;
        sort();
    }

    //add
    if(e.add) add(e.add);

    //update
    if(e.update) update();

}, false);

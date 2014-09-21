DS.classes.Timeline = function(){

    var events = [];
    var evtFiltered = [];
    var currentTime;
    var bounds = [0,0];

    //create webworker
    var worker = new Worker('/webworker/timeline');
	worker.postMessage('start');

    this.addEvent = function(evt){

        //check
        var evtTypes = Match.OneOf(DS.classes.Event, DS.classes.Message);
        check(evt, Match.Optional(evtTypes) );

        //add
        evt.on = false;
        events.push(evt);

        //update webworker
        worker.postMessage({
            'add': evt
        });

    };

    this.addEvents = function(list){

        for( var i=0; i < list.length ; i++){
            this.addEvent(list[i]);
        }

    };

    //extend this
    this.add = function(){};
    this.remove = function(){};
    this.update = function(){};

    //bounds
    this.setBounds = function(from, to){

        //save
        bounds = [from, to];

        //update worker
        worker.postMessage({
            'bounds': bounds
        });

    };

    this.calculateBounds = function(){

        var min, max;
        for( var i=0 ; i < events.length ; i++ ){

            //get
            var time = events[i].time.get();

            //min
            if( !min || time.from < min){
                min = time.from;
            }

            //max
            if( !max || time.to > max){
                max = time.to;
            }

        }

        //todo
        this.setBounds(min, max);

    };

    //manualy set a time
    this.setTime = function(date){

    };

    //move time forward
    this.forward = function(delta, deltaType){

        if(!deltaType) deltaType = 'minutes';

    };

    this.render = function(){

        //update webworker
        worker.postMessage({
            'setDate': events
        });

        //do rendering
        for( var i = 0 ; i < evtFiltered.length ; i++ ){

            var evt = evtFiltered[i];

            //check if active
            var active = evt.time.between(currentTime);

            //active, and add
            if(active && !evt.on){

                if( _.isFunction(evt.add) ){
                    evt.add(evt);
                } else {
                    this.add(evt)
                }

            }

            //not active, and remove
            if(!active && evt.on){

                if( _.isFunction(evt.remove) ){
                    evt.remove(evt);
                } else {
                    this.remove(evt);
                }

            }

            //active so update
            if(active){
                evt.update();
            }

        }

    };

    //save update
    worker.addEventListener('message', function(update){
        evtFiltered = update;
    });

    this.stop = function(){

        //clear webworker
        worker.postMessage('close');

    }

}

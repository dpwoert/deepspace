DS.classes.Timeline = function(){

    var events = [];
    var evtFiltered = [];
    var currentTime;
    var bounds = [0,0];

    //create webworker
    //var worker = new Worker('/webworker/timeline');
	//worker.postMessage('start');

    this.addEvent = function(evt){

        //check
        var evtTypes = Match.OneOf(DS.classes.Event, DS.classes.Message);
        check(evt, Match.Optional(evtTypes) );

        //add
        evt.on = false;
        events.push(evt);

        //update webworker
        // worker.postMessage({
        //     'add': evt
        // });

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

        //set pointer to start
        currentTime = from.clone();

        //update worker
        // worker.postMessage({
        //     'bounds': bounds
        // });

    };

    this.calculateBounds = function(){

        var min, max;
        for( var i=0 ; i < events.length ; i++ ){

            //get
            var time = events[i].time.get();

            //min
            if( !min || time.from.isBefore(min) ){
                min = time.from;
            }

            //max
            if( !max || time.to.isAfter(max) ){
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

        //move
        if(!delta) delta = 1;
        if(!deltaType) deltaType = 'minutes';
        currentTime.add(delta, deltaType);

        //render
        this.render();

    };

    this.render = function(){

        //update webworker
        // worker.postMessage({
        //     'setDate': events
        // });

        //do rendering
        for( var i = 0 ; i < events.length ; i++ ){

            var evt = events[i];

            //check if active
            var active = evt.time.between(currentTime);

            //active, and add
            if(active && !evt.on){

                //handler
                if( _.isFunction(evt.add) ){
                    evt.add(evt);
                } else {
                    this.add(evt)
                }

                //save state
                evt.on = true;

            }

            //not active, and remove
            if(!active && evt.on){

                //handler
                if( _.isFunction(evt.remove) ){
                    evt.remove(evt);
                } else {
                    this.remove(evt);
                }

                //save state
                evt.on = false;

            }

            //active so update
            if(active){

                //get progress
                var progress = evt.time.progress(currentTime);

                //handler
                if( _.isFunction(evt.update) ){
                    evt.update(evt, progress);
                } else {
                    this.update(evt, progress);
                }

            }

        }

    };

    //save update
    // worker.addEventListener('message', function(update){
    //     evtFiltered = update;
    // });

    this.start = function(){

        this.currentTime = bounds[0];

    }

    this.stop = function(){

        //clear webworker
        //worker.postMessage('close');

    }

    this.part = function(stepSize, unit){

        var data = [];

        //check if grouping is given
        stepSize = stepSize || 120;
        unit = unit || 'minutes';

        var unitStep =  1;
        //calculate stepsize of unit
        switch(unit){
            case 'days': unitStep *= 24;
            case 'hours': unitStep *= 60;
            case 'minutes': unitStep *= 60;
            case 'seconds': unitStep *= 1000;
        }

        //do grouping
        data = _.groupBy(events, function(evt){

            var normalised = evt.time.get().from.valueOf();
            // normalised -= bounds[0].valueOf();
            var step = stepSize * unitStep;

            // var group = normalised / step;
            return normalised - ( normalised % step );

        });

        return {
            'controls': {
                start: this.start,
                stop: this.stop,
                setTime: this.setTime
            },
            'bounds': bounds,
            'timeline': data,
            'pointer': currentTime,
            'stepSize': stepSize * unitStep
        };
    };

}

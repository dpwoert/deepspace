window.timeline = {};
timeline.items = [];
timeline.delta = 10;
timeline.play = true;
timeline.keepTicking = false;

//start month ago
timeline.current = new Date();
timeline.current = Math.round(facebook.from.setMonth(facebook.from.getMonth() - 1)/1000);

timeline.add = function(properties){

	var o = {
		from: 0,
		to: 0,
		visible: false,
		tick: null, //animation when visible
		change: null //on visibility change
	};

	$.extend(o, properties);

	//add
	timeline.items.push(o);
	
}

timeline.tick = function(){

	//play?
	if(timeline.play){
		timeline.current+=timeline.delta;
	}

	//check if need to animate
	if(timeline.current == timeline.last && !timeline.keepTicking){
		return false;
	}

	$.each(timeline.items, function(key, value){
		//visible
		if(timeline.current > value.from && timeline.current < value.to){

			//wasn't visible 
			if($.isFunction(value.change) && !value.visible){
				value.visible = true;
				value.change(true);
			}

			tick();

		} 
		//hidden
		else {
			//was visible, now isn't
			if(value.visible){
				value.visible = false;
				value.change(false);
			}
		}
	})
};

timeline.make3D = function(){

	//add to timeline
    $.each(data.posts, function(key, value){
        timeline.add({
            to: 0,
            from: 0
        });
    });
    
};
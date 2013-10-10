window.timeline = {};
timeline.items = [];
timeline.delta = 1000*60;
timeline.play = true;

//start month ago
timeline.current = new Date();
timeline.current = timeline.current.setMonth(timeline.current.getMonth() - 1);

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

	//[loop/restart]

	//show data
	timeline.show();

	//tick
	$.each(timeline.items, function(key, value){
		//visible
		if(timeline.current > value.from && timeline.current < value.to){

			//visible so tick
			if(value.visible){
				//status
				var completed = value.to - value.from;
				var progress = timeline.current - value.from;
				completed = (progress / completed);

				value.tick(value, completed);
			}

			//wasn't visible 
			if($.isFunction(value.change) && !value.visible){
				value.visible = true;
				value.change(true, value);
			}

		} 
		//hidden
		else {
			//was visible, now isn't
			if(value.visible){
				value.tick(value, 1);
				value.visible = false;
				value.change(false, value);
			}
		}
	})
};

timeline.make3D = function(){

	//add to timeline
    $.each(data.posts, function(id, user){
    	$.each(user, function(key, _this){

	    	//get dates
	    	_from = Date.parse(_this.created_time);
	    	_to = _from + (1000*60*60); 

	        timeline.add({
	            to: _to,
	            from: _from,
	            elements: null,
	            change: _change,
	            tick: _tick,
	            type: _this.type
	        });

	        //change
	        function _change(visible, obj){

	        	if(visible){
	        		//create items
	        		obj.elements = []
	        		$.each(graph.getConnections(id), function(cID, connection){
	        			var el = DDD.addMessage(connection.id, connection.negative, timeline.getMaterial(obj.type) );
	        			obj.elements.push(el);
	        			DDD.scene.add(el);
	        		});
	        	}
	        	else {
	        		//delete items
	        		$.each(obj.elements, function(){
	        			DDD.scene.remove(this);
	        		});
	        		obj.elements = null;
	        	}
	        }

	        //tick
	        function _tick(obj, completed){

	        	//check
	        	if(obj.elements == null) return false;

	        	//animate items
	        	$.each(obj.elements, function(key, val){

	        		var line = DDD.lines[val.userData.line];

	        		//get progress
	        		if(val.userData.negative){
	        			completed = 1-completed;
	        		}

	        		//path
	        		var path = new THREE.Spline([line.geometry.vertices[0], line.geometry.vertices[1]]);
	        		var point = path.getPoint( completed );

	        		//animate
	        		val.position = point;

	        		delete path, point;
	        	});
	        }

	    });
    });

};

timeline.show = function(){

	var d = new Date(timeline.current);
	$('#date').text(d.getHours() + ":"+ d.getMinutes() + " | " + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear());
	//$('#date').text(d.toISOString());

};

timeline.getMaterial = function(type){
	if(!color.posts[type]){
		type = 'other';
	}

	return DDD.material.message[type];
}

timeline.typeList = function(){

	var list = [];

	//make list
	$.each(data.posts, function(id, user){
		$.each(user, function(key, _this){
			if(list.indexOf(_this.type) == -1){
				//not in list so add
				list.push(_this.type);
			}
		});
	});

	return list;
	//["link", "status", "photo", "swf", "video", "checkin"]
}
window.cache = {};

cache.saveCache = function(){

	//check
	if(!localStorage || !JSON) return false;

	localStorage.cache = JSON.stringify(data);

};

cache.check = function(todo){

	if(localStorage && localStorage.cache && JSON){
		var todo = [];
		todo.push(cache.getData);
	}

	return todo;
}

cache.getData = function(){
	console.log('Got from cache');
	data = JSON.parse(localStorage.cache);
}

cache.clear = function(){
	localStorage.clear();
	return true;
}

cache.export = function(scramble){
	DDD.pause = true;

	//scramble names
	var x = 1;
	if(scramble){
		$.each(data.friends, function(k,v){
			data.friends[k] = 'PERSON ' + x;
			x++;
		});
	}

	//add start date
	var datum = new Date();
	var end = new Date();
	data.startDate = datum.setDate(datum.getDate() - 7 * 2);
	data.endDate = end;

	//export to text
	console.save(data);
	//$('body').append('<div id="export">window.EXAMPLE = '+JSON.stringify(data)+'</div>');
}
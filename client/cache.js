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
}
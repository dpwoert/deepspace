var workers = {};
Webworkers = {};

Router.map(function () {

	this.route('webworkers', {
		where: 'server',
		path: '/webworker/:name',

	    action: function () {

	    	var txt = workers[this.params.name];

            this.response.writeHead(200, {'Content-Type': 'application/javascript'});
	    	this.response.end(txt);
	    }
	});

});

Webworkers.add = function(name, content){
    workers[name] = content;
};

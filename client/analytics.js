window.analytics = {};
analytics.on = false;

analytics.addPage = function(page, title){
	ga('send', 'pageview', {
	  'page': page,
	  'title': title
	});
};

analytics.addDetail = function(title, slug){
	analytics.addPage('/detail/' + slug, title);
};
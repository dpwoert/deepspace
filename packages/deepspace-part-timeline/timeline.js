var data, rawData;
var bounds = [];
var min, max, stepSize;
var left, right, height;
var scales = {};

var calculateScales = function(){

    //dimensions
    left = 0;
    right = window.innerWidth;
    height = 50;

    //calculate extremes - Y
    min = d3.min(data, function(d){ return d.list.length; });
    max = d3.max(data, function(d){ return d.list.length; });
    var groups = data.length - 1;

    //calculcate bound - X
    // bounds[0] = d3.min(data, function(d){ return +d.date; });
    // bounds[1] = d3.max(data, function(d){ return +d.date; });

    //scales - todo calculate with date what x scales is
    scales.x = d3.scale.linear().domain([bounds[0], bounds[1]]).range([left, right]);
    scales.x2 = d3.scale.linear().domain([bounds[0], bounds[1]]).range([0,1]);
    scales.y = d3.scale.linear().domain([max, 0]).range([5, height]);

};

var render = function(){

    var renderData = [];

    //get line
    var line = d3.svg.line()
        .x(function(d,i) { return scales.x( +d.date ); })
        .y(function(d,i) { return scales.y( d.list.length ); })
        .interpolate('basis');
        // .interpolate('linear');

    //get keys
    var keys = Object.keys(rawData);
    var i = parseInt(keys[ 0 ]);

    while( i >= bounds[0] ){

        var date = moment(i);

        //find
        var items = rawData[i] || [];

        renderData.push({

            'date': i,
            'list': items

        });

        //loop
        i-= stepSize;

    }

    //save line
    Session.set('path', line(renderData));

};

var elements = function(){

    var circles = [];
    var labels = [];

    var startColor = [52, 152, 219];
    var endColor = [39, 174, 96];

    //get keys
    var keys = Object.keys(rawData);
    var i = parseInt(keys[ 0 ]);

    while( i >= bounds[0] ){

        var date = moment(i);

        //find
        var items = rawData[i] || [];

        // https://gist.github.com/mbostock/1705868
        var color = [];
        percent = scales.x2(i);
        color[0] = Math.round( startColor[0] + percent * (endColor[0] - startColor[0]) );
        color[1] = Math.round( startColor[1] + percent * (endColor[1] - startColor[1]) );
        color[2] = Math.round( startColor[2] + percent * (endColor[2] - startColor[2]) );

        var path = $('.timeline path')[0];
        var y = path.getPointAtLength( path.getTotalLength() - scales.x(i) );

        //circles
        circles.push({
            x: scales.x( i ),
            y: y.y,
            color: 'rgb('+color[0]+','+color[1]+','+color[2]+')'
        });

        //labels
        labels.push({
            x: scales.x( i ),
            y: 68,
            text: date.format('HH:mm')
        });

        //loop
        i-= stepSize;

    }

    Session.set('pathCircles', circles);
    Session.set('pathLabels', labels);

}

var toArray = function(data){

    var list = [];

    //add each entry to list
    _.each(data, function(item, date){

        list.push({
            date: date,
            list: item
        });

    });

    return list;

}

Template.timeline.rendered = function(){

    //convert to array, is object because of underscore's grouping by
    data = toArray(this.data.timeline);
    rawData = this.data.timeline;
    stepSize = this.data.stepSize;
    bounds = this.data.bounds;

    //d3 calculations
    calculateScales();
    render();

    //add circles and labels to timeline
    _.defer(elements);

    //just checking
    console.log('date for timeline part', this.data);

};

Template.timeline.path = function(){
    return Session.get('path');
};

Template.timeline.circles = function(){
    return Session.get('pathCircles');
};

Template.timeline.labels = function(){
    return Session.get('pathLabels');
};

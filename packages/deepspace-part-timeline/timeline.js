var data;
var bounds;
var min, max;
var left, right, height;
var scales = {};

var calculateScales = function(){

    //dimensions
    left = 0;
    right = window.innerWidth;
    height = 60;

    //calculate extremes
    min = d3.min(data, function(d){ return d.list.length; });
    max = d3.max(data, function(d){ return d.list.length; });
    var groups = data.length - 1;

    //scales
    scales.x = d3.scale.linear().domain([0, groups]).range([left, right]);
    scales.y = d3.scale.linear().domain([max, 0]).range([0, height]);

};

var render = function(){

    //get line
    var line = d3.svg.line()
        .x(function(d,i) { return scales.x(i); })
        .y(function(d,i) { return scales.y( d.list.length ); })
        .interpolate('basis');
        // .interpolate('bundle');

    //save line
    Session.set('path', line(data));

};

var elements = function(){

    var circles = [];
    var labels = [];

    //add the elements for each row
    _.each(data, function(row, key){

        if(key % 6 === 0){

            var date = moment(+row.date);
            console.log(+row.date);

            //circles
            circles.push({
                x: scales.x( key ),
                y: scales.y( row.list.length )
            });

            //labels
            labels.push({
                x: scales.x( key ),
                y: 65,
                text: date.format('HH:mm')
            });

        }
    });

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

    //d3 calculations
    calculateScales();
    render();

    //add circles and labels to timeline
    elements();

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

var data;
var min, max;
var left, right, height;
var scales = {};

var calculateScales = function(){

    //dimensions
    left = 0;
    right = window.innerWidth;
    height = 50;

    //calculate extremes
    min = d3.min(data, function(d){ return d.length; });
    max = d3.max(data, function(d){ return d.length; });
    var groups = data.length - 1;

    //scales
    scales.x = d3.scale.linear().domain([0, groups]).range([left, right]);
    scales.y = d3.scale.linear().domain([max, 0]).range([0, height]);

};

var render = function(){

    //get line
    var line = d3.svg.line()
        .x(function(d,i) { return scales.x(i); })
        .y(function(d,i) { return scales.y( d.length ); })
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

            //circles
            circles.push({
                x: scales.x( key ),
                y: scales.y( row.length )
            });

            //labels
            labels.push({
                x: scales.x( key ),
                y: scales.y( row.length ),
                text: key
            });

        }
    });

    Session.set('pathCircles', circles);
    Session.set('pathLabels', labels);

}

Template.timeline.rendered = function(){

    console.log('timeline');

    //convert to array, is object because of underscore's grouping by
    data = _.toArray(this.data.data);

    //d3 calculations
    calculateScales();
    render();

    //add circles and labels to timeline
    elements();

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

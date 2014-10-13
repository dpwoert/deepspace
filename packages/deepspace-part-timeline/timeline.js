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
    var groups = data.length;

    //scales
    scales.x = d3.scale.linear().domain([0, groups]).range([left, right]);
    scales.y = d3.scale.linear().domain([0, max]).range([0, height]);

};

var render = function(){

    //get line
    var line = d3.svg.line()
        .x(function(d,i) { return scales.x(i); })
        .y(function(d,i) { return scales.y( d.length ); })
        .interpolate('basis');

    //save line
    Session.set('path', line(data));

};

Template.timeline.rendered = function(){

    //convert to array, is object because of underscore's grouping by
    data = _.toArray(this.data.data);

    //d3 calculations
    calculateScales();
    render();

};

Template.timeline.path = function(){
    return Session.get('path');
};

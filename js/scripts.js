// dropdowns
var color_data_select = d3.select("#color-data");
var color_data_value = color_data_select.node().value;

var x_data_select = d3.select("#x-position-data");
var x_data_value = x_data_select.node().value;

var size_data_select = d3.select("#size-data");
var size_data_value = size_data_select.node().value;

// 3d/4d select
var dimension_options = {
  on: {
    data: [],
    property: "uid"
  },
  off: {
    data: [
      {frequency: 261.63, note: "C", octave: 4, keyboard: "q"},
      {frequency: 293.66, note: "D", octave: 4, keyboard: "w"},
      {frequency: 329.63, note: "E", octave: 4, keyboard: "e"},
      {frequency: 349.23, note: "F", octave: 4, keyboard: "r"},
      {frequency: 392.00, note: "G", octave: 4, keyboard: "u"},
      {frequency: 440, note: "A", octave: 4, keyboard: "i"},
      {frequency: 493.88, note: "B", octave: 4, keyboard: "o"},
      {frequency: 523.25, note: "C", octave: 5, keyboard: "p"}
    ],
    property: "id"
  }
}

// create a new audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext()

// an empty array for storing currently playing notes
var currNotes =  [];

// each note needs additional information
dimension_options.off.data.forEach((d, i) => {
  d.indx = i;
  d.middle = 2;
  d.id = d.note + d.octave;
  d.duration = 0;
  d.timer = d3.timer(() => {});
  d.timer.stop();

  d.oscillator = null;
  d.gain = null;

  return d;
});

// this is the note that plays if you don't press one of the keyboard values in dimension_options.off.data
var defaultNote = dimension_options.off.data[0];

// set up display
var width = window.innerWidth, height = window.innerHeight;

var svg = d3.select("#display-3d").append("svg").attr("width", width).attr("height", height);

//scales

// the size scale range max needs to change if there are a lot of circles
var size_range_max = height; 
var scale_size = d3.scaleLinear().range([0, size_range_max]).domain([0, 1200]);

var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain(d3.extent(dimension_options.off.data, d => d[color_data_value]));
var scale_x = d3.scaleLinear().range([200, width - 200]).domain(d3.extent(dimension_options.off.data, d => d[x_data_value]));


// draw the center line
var line = svg.append("line")
  .attr("x1", scale_x(dimension_options.off.data[0][x_data_value]))
  .attr("y1", height / 2)
  .attr("x2", scale_x(dimension_options.off.data[dimension_options.off.data.length - 1][x_data_value]))
  .attr("y2", height / 2)
  .style("stroke", "#ccc");

// THIS PART UPDATES THE DATA BASED ON KEY PRESSING
d3.select(document).on("keypress", () => {

  var pressedNote = getPressedNote(d3.event.key);
  var pressedNote_indx = dimension_options.off.data.indexOf(pressedNote);

  // if the note being played is not in the currNotes array
  if (currNotes.indexOf(pressedNote.id) == -1){

    // add the current note to the currNotes array
    currNotes.push(pressedNote.id);

    // add the current note to the dimension_options.on.data array
    var copyNote = jz.arr.deepCopy(pressedNote);
    copyNote.uid = dimension_options.on.data.length;
    copyNote.indx = pressedNote_indx;
    dimension_options.on.data.push(copyNote);
    
    // add time to the duration of the current note
    dimension_options.off.data[pressedNote_indx].timer.restart(elapsed => {

      dimension_options.off.data[pressedNote_indx].duration = elapsed;
      dimension_options.on.data[copyNote.uid].duration = elapsed;

      var dimension_selector = get4dChecked();
      if (dimension_selector == "on") draw({show_all: dimension_selector, transition: 0});

    });

    // create an oscillator and gain, and start the oscillator
    dimension_options.off.data[pressedNote_indx].oscillator = context.createOscillator();
    dimension_options.off.data[pressedNote_indx].oscillator.frequency.value = pressedNote.frequency;
    dimension_options.off.data[pressedNote_indx].gain = context.createGain();
    dimension_options.off.data[pressedNote_indx].oscillator.connect(dimension_options.off.data[pressedNote_indx].gain);
    dimension_options.off.data[pressedNote_indx].gain.connect(context.destination);

    dimension_options.off.data[pressedNote_indx].oscillator.start(0);

    d3.select(".circle-" + pressedNote.id).moveToFront();
    d3.select(".text-" + pressedNote.id).moveToFront();

  }

}).on("keyup", () => {
  
  var pressedNote = getPressedNote(d3.event.key);
  var pressedNote_indx = dimension_options.off.data.indexOf(pressedNote);

  // remove the pressed note from the current notes array
  currNotes = jz.arr.removeItem(currNotes, pressedNote.id);

  // stop the time in the current note
  dimension_options.off.data[pressedNote_indx].timer.stop();
  
  // fade out the gain and remove the oscillator and gain from the current note
  dimension_options.off.data[pressedNote_indx].gain.gain.setTargetAtTime(0, context.currentTime, 0.2);
  dimension_options.off.data[pressedNote_indx].oscillator = null;
  dimension_options.off.data[pressedNote_indx].gain = null;  

  // fade out the duration of the current note, so the circle doesnt just disappear
  var duration_scale = d3.scalePow().range([dimension_options.off.data[pressedNote_indx].duration, 0]).domain([0, 200]);

  var t = d3.timer((e) => {
  
    dimension_options.off.data[pressedNote_indx].duration = duration_scale(e) < 0 ? 0 : duration_scale(e);
    if (duration_scale(e) == 0) t.stop();
    
  });
  
});

// A HELPER FUNCTION TO LOOK UP THE NOTE BASED ON THE KEY PRESSED
function getPressedNote(key){
  var pressedNote = dimension_options.off.data.filter(d => d.keyboard == key);
  return pressedNote.length == 0 ? defaultNote : pressedNote[0];
}

// this is always running, and drawing depending on the current data
// IT ONLY DRAWS IF 4D MODE IS OFF
d3.timer(() => {

  if (get4dChecked() == "off") draw({show_all: "off", transition: 0});

});

// FUNCTIONS TO GET THE DOMAIN BASED ON DROPDOWN SELECTIONS
function getSizeDomain(size_data_value){
  return size_data_value == "duration" ? [0, 1200] :
    size_data_value == "frequency" ? [dimension_options.off.data[0].frequency - 100, dimension_options.off.data[dimension_options.off.data.length - 1].frequency * 3] : 
    [1, 12];
}

function getColorDomain(color_data_value){
  return color_data_value == "frequency" ? d3.extent(dimension_options.off.data, d => d[color_data_value]) : 
    color_data_value == "duration" ? [0, 600] :
    [Infinity, Infinity];
}

function getXDomain(x_data_value){
  var dimension_selector = get4dChecked();
  return x_data_value == "indx" ? d3.extent(dimension_options.off.data, d => d[x_data_value]) :
    x_data_value == "duration" ? 
      dimension_selector == "on" ? d3.extent(dimension_options[dimension_selector].data, d => d.duration) :
      [0, 1000] :
    [1, 3];
}

// the main draw function
// options:
// show_all - string - "on" or "off"
// transition - number - how long should the transition be?
// shape - string - "circle" or "rect"

function draw(options){
  
  d3.select("line").transition().style("opacity", 1);

  // dimensions
  width = window.innerWidth, height = window.innerHeight;

  // mappings
  color_data_value = color_data_select.node().value;
  x_data_value = x_data_select.node().value;
  size_data_value = size_data_select.node().value;

  // scale ranges
  scale_x.range([200, width - 200]);
  scale_size.range([0, height]);

  // scale domains
  scale_color.domain(getColorDomain(color_data_value));
  scale_x.domain(getXDomain(x_data_value));
  scale_size.domain(getSizeDomain(size_data_value));

  var draw_data = dimension_options[options.show_all].data;
  var draw_property = dimension_options[options.show_all].property;

  var simulation = d3.forceSimulation(draw_data) 
    .force("y", d3.forceY(height / 2))
    .force("x", d3.forceX(d => scale_x(d[x_data_value])).strength(1))
    .stop();

  for (var i = 0; i < 1; i++) simulation.tick(); // get some position    

  // do some things differently in 4d mode
  var rescale = 1;
  var rescale_coefficient = 6;
  if (options.show_all == "on") {

    // figure out if we need to make things smaller
    var biggest_over = d3.max(draw_data, d => rescale_coefficient * scale_size(d[size_data_value]) - d.y);

    rescale = biggest_over > 0 ? height / (height + biggest_over) : 1;

    simulation.force("collide", d3.forceCollide(d => rescale * scale_size(d[size_data_value])));

  }

  for (var i = 0; i < 120; i++) simulation.tick(); // run the simulation

  circle = svg.selectAll(".circle")
      .data(draw_data, d => d[draw_property]);  

  text = svg.selectAll("text")
      .data(draw_data, d => d[draw_property]);

  // handle the exits
  if (options.transition !== 0){
    circle.exit()
      .transition(options.transition)  
        .attr("d", d => shape2path.circle({cx: d.x, cy: d.y, r: 0}))
      .remove();

    text.exit()
      .transition(options.transition)
        .attr("dy", 0)
        .style("font-size", 0)
      .remove();
  } else {
    circle.exit().remove();
    text.exit().remove();
  }

  circle.transition().duration(options.transition)
      .attr("d", d => shape2path.circle({cx: d.x, cy: d.y, r: rescale * scale_size(d[size_data_value])}))
      .style("fill", d => scale_color(d[color_data_value]))
      .style("display", d => d.duration == 0 ? "none" : d3.selectAll("input[name='circle']:checked").property("value"))

  circle.enter().append("path")
      .attr("class", d => "circle circle-" + d.id)
      .attr("d", d => shape2path.circle({cx: d.x, cy: d.y, r: rescale * scale_size(d[size_data_value])}))
      .style("fill", d => scale_color(d[color_data_value]))
      .style("display", d => d.duration == 0 ? "none" : d3.selectAll("input[name='circle']:checked").property("value"))

  text.transition().duration(options.transition)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", d => rescale * scale_size(d[size_data_value]) / 4)
      .style("font-size", d => rescale * scale_size(d[size_data_value]) + "px")
      .style("fill", color_data_value == "none" && d3.selectAll("input[name='text']:checked").property("value") == "block" ? "#fff" : "#000")
      .style("display", d => d.duration == 0 ? "none" : d3.selectAll("input[name='text']:checked").property("value"))

  text.enter().append("text")
      .attr("class", d => "text text-" + d.id)
      .style("text-anchor", "middle")
      .text(d => d.note)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", d => rescale * scale_size(d[size_data_value]) / 4)
      .style("font-size", d => rescale * scale_size(d[size_data_value]) + "px")
      .style("fill", color_data_value == "none" && d3.selectAll("input[name='text']:checked").property("value") == "block" ? "#fff" : "#000")
      .style("display", d => d.duration == 0 ? "none" : d3.selectAll("input[name='text']:checked").property("value"))
}



// handle events

// show/hide circle & text
["circle", "text"].forEach(element => {
  var selector = "input[name='" + element + "']";
  d3.selectAll(selector).on("change", () => {
    d3.selectAll(element).style("display", d3.selectAll(selector + ":checked").property("value"));
  });
});

// reset the 4d
d3.select("#reset-4d").on("click", () => {
  dimension_options.on.data = [];
  draw({show_all: get4dChecked(), transition: 750})
});

// update chart on 3d/4d selection
d3.selectAll("input[name='4d']").on("change", () => {
  enableOrDisableBars();
  draw({show_all: get4dChecked(), transition: 0});
});
// update the chart on select change
d3.selectAll("select").on("change", () => {
  var selector = get4dChecked();
  draw({show_all: selector, transition: selector == "on" ? 750 : 0});
});


// draw bars or not
d3.selectAll("input[name='bars']").on("change", () => {
  
});

// call them right away
enableOrDisableBars();

// HELPER FUNCTIONS

function enableOrDisableBars(){
  d3.selectAll("input[name='bars']").property("disabled", get4dChecked() == "off");
  d3.select(".dropdown-container.bars").classed("disabled", get4dChecked() == "off")
}

function get4dChecked(){
  return d3.select("input[name='4d']:checked").property("value");
}

// show or hide the controls
d3.select(".dropdown-wrapper").on("mouseover", () => {
  d3.select(".dropdown-wrapper").style("opacity", 1);
}).on("mouseout", () => {
  d3.select(".dropdown-wrapper").style("opacity", 0);
});

// WHAT TO DO ON RESIZE
d3.select(window).on("resize", () => {
    
  // dimensions
  width = window.innerWidth, height = window.innerHeight;
  svg.attr("width", width).attr("height", height);
  
  // scales
  scale_x.range([200, width - 200]).domain(getXDomain(x_data_value));
  scale_size.range([0, size_range_max]);
  
  line
    .attr("x1", scale_x(dimension_options.off.data[0][x_data_value]))
    .attr("y1", height / 2)
    .attr("x2", scale_x(dimension_options.off.data[dimension_options.off.data.length - 1][x_data_value]))
    .attr("y2", height / 2);

  draw({show_all: get4dChecked(), transition: 0});

});
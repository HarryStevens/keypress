// var dimension_options.on.data = [];

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

// an array of all available notes. add notes and everything else updates


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

var svg_3d = d3.select("#display-3d").append("svg").attr("width", width).attr("height", height);

//scales
var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain(d3.extent(dimension_options.off.data, d => d[color_data_value]));
var scale_size_3d = d3.scaleLinear().range([0, height]).domain([0, 1200]);
var scale_x_3d = d3.scaleLinear().range([200, width - 200]).domain(d3.extent(dimension_options.off.data, d => d[x_data_value]));

// draw the center line
var line = svg_3d.append("line")
  .attr("x1", scale_x_3d(dimension_options.off.data[0][x_data_value]))
  .attr("y1", height / 2)
  .attr("x2", scale_x_3d(dimension_options.off.data[dimension_options.off.data.length - 1][x_data_value]))
  .attr("y2", height / 2)
  .style("stroke", "#ccc");

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

// this is always running, and drawing depending on the current data
d3.timer(() => {

  update();

  // are we drawing 3d or 4d data?
  var dimension_selector = document.querySelector("input[name='4d']:checked").value;
  var draw_data = dimension_options[dimension_selector].data;
  var draw_property = dimension_options[dimension_selector].property;

  var simulation = d3.forceSimulation(draw_data) 
    .force("y", d3.forceY(height / 2))
    .force("x", d3.forceX(d => scale_x_3d(d[x_data_value])).strength(1))
    .stop();

  if (dimension_selector == "on") simulation.force("collide", d3.forceCollide(d => scale_size_3d(d[size_data_value])));

  for (var i = 0; i < 100; i++) simulation.tick(); // get some position

  var circle = svg_3d.selectAll("circle")
      .data(draw_data, d => d[draw_property]);

  var text = svg_3d.selectAll("text")
      .data(draw_data, d => d[draw_property]);

  circle.exit().remove();

  circle.enter().append("circle")
      .attr("class", d => "circle circle-" + d.uid)
    .merge(circle)
      .attr("cy", d => d.y)
      .attr("cx", d => d.x)
      .attr("r", d => scale_size_3d(d[size_data_value]))
      .style("fill", d => scale_color(d[color_data_value]))
      .style("fill-opacity", d => d.duration == 0 ? 0 : 1);

  text.exit().remove();

  text.enter().append("text")
      .attr("class", d => "text text-" + d.uid)
      .style("text-anchor", "middle")
      .text(d => d.note)
    .merge(text)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", d => scale_size_3d(d[size_data_value]) / 4)
      .style("font-size", d => scale_size_3d(d[size_data_value]))
      .style("opacity", d => d.duration == 0 ? 0 : 1)
      .style("fill", color_data_value == "none" && document.querySelector("input[name='circle']:checked").value == "block" ? "#fff" : "#000");

});

function getPressedNote(key){
  var pressedNote = dimension_options.off.data.filter(d => d.keyboard == key);
  return pressedNote.length == 0 ? defaultNote : pressedNote[0];
}

// resize
d3.select(window).on("resize", () => {
    
  // dimensions
  width = window.innerWidth, height = window.innerHeight;
  svg_3d.attr("width", width).attr("height", height);
  // scales
  scale_x_3d.range([200, width - 200]).domain(getXDomain(x_data_value));
  scale_size_3d.range([0, height]);
  
  line
    .attr("x1", scale_x_3d(dimension_options.off.data[0][x_data_value]))
    .attr("y1", height / 2)
    .attr("x2", scale_x_3d(dimension_options.off.data[dimension_options.off.data.length - 1][x_data_value]))
    .attr("y2", height / 2);
});

function getSizeDomain(size_data_value){
  return size_data_value == "duration" ? [0, 1200] :
    size_data_value == "frequency" ? [dimension_options.off.data[0].frequency - 100, dimension_options.off.data[dimension_options.off.data.length - 1].frequency * 8] : 
    [1, 12];
}

function getColorDomain(color_data_value){
  return color_data_value == "frequency" ? d3.extent(dimension_options.off.data, d => d[color_data_value]) : 
    color_data_value == "duration" ? [0, 600] :
    [Infinity, Infinity];
}

function getXDomain(x_data_value){
  return x_data_value == "indx" ? d3.extent(dimension_options.off.data, d => d[x_data_value]) :
    x_data_value == "duration" ? [0, 1200] :
    [1, 3];
}

["circle", "text"].forEach(element => {
  var selector = "input[name='" + element + "']";
  d3.selectAll(selector).on("change", () => {
    d3.selectAll(element).style("display", d3.selectAll(selector + ":checked").property("value"))
  });  
});

d3.select(".dropdown-wrapper").on("mouseover", () => {
  d3.select(".dropdown-wrapper").style("opacity", 1);
}).on("mouseout", () => {
  d3.select(".dropdown-wrapper").style("opacity", 0);
});

function update(){
  // dimensions
  width = window.innerWidth, height = window.innerHeight;

  // mappings
  color_data_value = color_data_select.node().value;
  x_data_value = x_data_select.node().value;
  size_data_value = size_data_select.node().value;

  // scale ranges
  scale_x_3d.range([200, width - 200]);
  scale_size_3d.range([0, height]);

  // scale domains
  scale_color.domain(getColorDomain(color_data_value));
  scale_x_3d.domain(getXDomain(x_data_value));
  scale_size_3d.domain(getSizeDomain(size_data_value));
}


/* kuch kuch hota hai
klkjfk
klkjfk
jkjfdja
jfkjfff

asdfkj
asdfkjjj
jkjfdja
jfkjfff
*/
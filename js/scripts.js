var recordedNotes = [];

var color_data_select = d3.select("#color-data");
var color_data_value = color_data_select.node().value;

var x_data_select = d3.select("#x-position-data");
var x_data_value = x_data_select.node().value;

var size_data_select = d3.select("#size-data");
var size_data_value = size_data_select.node().value;

// create a new audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext()

// an empty array for storing currently playing notes
var currNotes =  [];

// an array of all available notes. add notes and everything else updates
var allNotes = [
  {frequency: 261.63, note: "C", octave: 4, keyboard: "q"},
  {frequency: 293.66, note: "D", octave: 4, keyboard: "w"},
  {frequency: 329.63, note: "E", octave: 4, keyboard: "e"},
  {frequency: 349.23, note: "F", octave: 4, keyboard: "r"},
  {frequency: 392.00, note: "G", octave: 4, keyboard: "u"},
  {frequency: 440, note: "A", octave: 4, keyboard: "i"},
  {frequency: 493.88, note: "B", octave: 4, keyboard: "o"},
  {frequency: 523.25, note: "C", octave: 5, keyboard: "p"}
];

// each note needs additional information
allNotes.forEach((d, i) => {
  d.index = i;
  d.middle = 2;
  d.id = d.note + d.octave;
  d.duration = 0;
  d.timer = d3.timer(() => {});
  d.timer.stop();

  d.oscillator = null;
  d.gain = null;

  return d;
});

// this is the note that plays if you don't press one of the keyboard values in allNotes
var defaultNote = allNotes[0];

// set up display
var width = window.innerWidth, height = window.innerHeight;

var svg_3d = d3.select("#display-3d").append("svg").attr("width", width).attr("height", height);
var svg_4d = d3.select("#display-4d").append("svg").attr("width", width).attr("height", height);

//scales
var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain(d3.extent(allNotes, d => d[color_data_value]));
var scale_size_3d = d3.scaleLinear().range([0, height]).domain([0, 1200]);
var scale_size_4d = d3.scaleLinear().range([5, 40])
var scale_x_3d = d3.scaleLinear().range([200, width - 200]).domain(d3.extent(allNotes, d => d[x_data_value]));
var scale_x_4d = d3.scaleBand().rangeRound([0, width]).domain(allNotes.map(d => d.id));

// draw the center line
var line = svg_3d.append("line")
  .attr("x1", scale_x_3d(allNotes[0][x_data_value]))
  .attr("y1", height / 2)
  .attr("x2", scale_x_3d(allNotes[allNotes.length - 1][x_data_value]))
  .attr("y2", height / 2)
  .style("stroke", "#ccc");

// create the force simulation
var simulation = d3.forceSimulation(recordedNotes)
  .force("charge", d3.forceManyBody().strength(.01))
  .force("collide", d3.forceCollide().radius(d => scale_size_4d(d.duration)))
  .force("y", d3.forceY(height / 2))
  .on("tick", redraw);

allNotes.forEach(note => {
  simulation.force(note.id, isolate( d3.forceX( scale_x_4d(note.id) + scale_x_4d.bandwidth() / 2 ) , d => d.id == note.id))
});

function redraw() {
  
  var circle = svg_4d.selectAll("circle")
      .data(recordedNotes, d => d.uid)
  
  circle.enter().append("circle")
      .style("fill", d => scale_color(d.frequency))
      .style("stroke", "#fff")
    .merge(circle)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => scale_size_4d(d.duration));

}

function isolate(force, filter) {
  var initialize = force.initialize;
  force.initialize = function() { initialize.call(force, recordedNotes.filter(filter)); };
  return force;
}

allNotes.forEach(note => {
  simulation.force(note.id, isolate( d3.forceX( scale_x_4d(note.id) + scale_x_4d.bandwidth() / 2 ) , d => d.id == note.id))
});

d3.select(document).on("keypress", () => {

  var pressedNote = getPressedNote(d3.event.key);
  var pressedNote_index = allNotes.indexOf(pressedNote);

  // if the note being played is not in the currNotes array
  if (currNotes.indexOf(pressedNote.id) == -1){

    // add the current note to the array
    currNotes.push(pressedNote.id);
    
    // add time to the duration of the current note
    allNotes[pressedNote_index].timer.restart(elapsed => {

      allNotes[pressedNote_index].duration = elapsed;

    });

    // create an oscillator and gain, and start the oscillator
    allNotes[pressedNote_index].oscillator = context.createOscillator();
    allNotes[pressedNote_index].oscillator.frequency.value = pressedNote.frequency;
    allNotes[pressedNote_index].gain = context.createGain();
    allNotes[pressedNote_index].oscillator.connect(allNotes[pressedNote_index].gain);
    allNotes[pressedNote_index].gain.connect(context.destination);

    allNotes[pressedNote_index].oscillator.start(0);

    d3.select(".circle-" + pressedNote.id).moveToFront();
    d3.select(".text-" + pressedNote.id).moveToFront();

  }

}).on("keyup", () => {
  
  var pressedNote = getPressedNote(d3.event.key);
  var pressedNote_index = allNotes.indexOf(pressedNote);

  // add the pressed notes to the recordedNotes
  var copy = jz.arr.deepCopy(allNotes[pressedNote_index]);
  var d = new Date();
  copy.timestamp = d.getTime() - copy.duration;
  copy.uid = jz.str.randomString(20);
  scale_size_4d.domain(d3.extent(recordedNotes, d => d.duration));
  copy.x = scale_x_4d(pressedNote.id) + scale_x_4d.bandwidth() / 2;
  copy.y = height / 2;
  recordedNotes.push(copy);

  simulation.nodes(recordedNotes).alpha(1).restart();

  allNotes.forEach(note => {
    simulation.force(note.id, isolate( d3.forceX( scale_x_4d(note.id) + scale_x_4d.bandwidth() / 2 ) , d => d.id == note.id))
  })

  simulation.on("tick", redraw);


  // remove the pressed note from the current notes array
  currNotes = jz.arr.removeItem(currNotes, pressedNote.id);

  // stop the time in the current note
  allNotes[pressedNote_index].timer.stop();
  
  // fade out the gain and remove the oscillator and gain from the current note
  allNotes[pressedNote_index].gain.gain.setTargetAtTime(0, context.currentTime, 0.2);
  allNotes[pressedNote_index].oscillator = null;
  allNotes[pressedNote_index].gain = null;  

  // fade out the duration of the current note, so the circle doesnt just disappear
  var duration_scale = d3.scalePow().range([allNotes[pressedNote_index].duration, 0]).domain([0, 200]);

  var t = d3.timer((e) => {
  
    allNotes[pressedNote_index].duration = duration_scale(e) < 0 ? 0 : duration_scale(e);
    if (duration_scale(e) == 0) t.stop();
    
  });
  
});

// this is always running, and drawing depending on the current data
d3.timer(() => {

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

  var circle = svg_3d.selectAll("circle")
    .data(allNotes, d => d.id);

  var text = svg_3d.selectAll("text")
      .data(allNotes, d => d.id);

  circle.enter().append("circle")
      .attr("class", d => "circle circle-" + d.id)
    .merge(circle)
      .attr("cy", height / 2)
      .attr("cx", d => scale_x_3d(d[x_data_value]))
      .attr("r", d => scale_size_3d(d[size_data_value]))
      .style("fill", d => scale_color(d[color_data_value]))
      .style("fill-opacity", d => d.duration == 0 ? 0 : 1)      

  text.enter().append("text")
      .attr("class", d => "text text-" + d.id)
      .style("text-anchor", "middle")
      .text(d => d.note)
    .merge(text)
      .attr("x", d => scale_x_3d(d[x_data_value]))
      .attr("y", height / 2)
      .attr("dy", d => scale_size_3d(d[size_data_value]) / 4)
      .style("font-size", d => scale_size_3d(d[size_data_value]))
      .style("opacity", d => d.duration == 0 ? 0 : 1)
      .style("fill", color_data_value == "none" && document.querySelector("input[name='circle']:checked").value == "block" ? "#fff" : "#000");

});

function getPressedNote(key){
  var pressedNote = allNotes.filter(d => d.keyboard == key);
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
    .attr("x1", scale_x_3d(allNotes[0][x_data_value]))
    .attr("y1", height / 2)
    .attr("x2", scale_x_3d(allNotes[allNotes.length - 1][x_data_value]))
    .attr("y2", height / 2);
});

function getSizeDomain(size_data_value){
  return size_data_value == "duration" ? [0, 1200] :
    size_data_value == "frequency" ? [allNotes[0].frequency - 100, allNotes[allNotes.length - 1].frequency * 8] : 
    [1, 12];
}

function getColorDomain(color_data_value){
  return color_data_value == "frequency" ? d3.extent(allNotes, d => d[color_data_value]) : 
    color_data_value == "duration" ? [0, 600] :
    [Infinity, Infinity];
}

function getXDomain(x_data_value){
  return x_data_value == "index" ? d3.extent(allNotes, d => d[x_data_value]) :
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
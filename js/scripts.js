// create a new audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext()

var scale_x_property = "id";

// an empty array for storing currently playing notes
var currNotes =  [];

// an array of all available notes. add notes and everything else updates
var allNotes = [
  {frequency: 261.63, note: "C", octave: 4, keyboard: "a"},
  {frequency: 293.66, note: "D", octave: 4, keyboard: "s"},
  {frequency: 329.63, note: "E", octave: 4, keyboard: "d"},
  {frequency: 349.23, note: "F", octave: 4, keyboard: "f"},
  {frequency: 392.00, note: "G", octave: 4, keyboard: "j"},
  {frequency: 440, note: "A", octave: 4, keyboard: "k"},
  {frequency: 493.88, note: "B", octave: 4, keyboard: "l"},
  {frequency: 523.25, note: "C", octave: 5, keyboard: ";"}
]

// each note needs additional information
allNotes.forEach(d => {
  d.id = d.note + d.octave;
  d.duration = 0;
  d.timer = d3.timer(() => {});
  d.timer.stop();

  d.oscillator = null;
  d.gain = null;

  return d;
});

// this is the note that plays if you don't select one of the keyboard values in allNotes
var defaultNote = allNotes[0];

// set up display
var width = window.innerWidth, height = window.innerHeight;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

var scale_size = d3.scaleLinear().range([0, height]).domain([0, 1200]);
var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain(d3.extent(allNotes, d => d.frequency));
var scale_x = d3.scaleBand().rangeRound([200, width - 200]).domain(allNotes.map(d => d[scale_x_property]));

var line = svg.append("line")
  .attr("x1", scale_x(allNotes[0][scale_x_property]) + scale_x.bandwidth() / 2)
  .attr("y1", height / 2)
  .attr("x2", scale_x(allNotes[allNotes.length - 1][scale_x_property])  + scale_x.bandwidth() / 2)
  .attr("y2", height / 2)
  .style("stroke", "#ccc");

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

  }


  

}).on("keyup", () => {
  
  var pressedNote = getPressedNote(d3.event.key);
  var pressedNote_index = allNotes.indexOf(pressedNote);

  // remove the pressed note from the current notes array
  removeItem(currNotes, pressedNote.id);

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

  // scales
  scale_x.range([200, width - 200]);
  scale_size.range([0, height]);

  var circle = svg.selectAll("circle")
      .data(allNotes, d => d.id);

  var text = svg.selectAll("text")
      .data(allNotes, d => d.id);

  circle.enter().append("circle")
  		.attr("class", d => "circle circle-" + d.id)
      .style("fill", d => scale_color(d.frequency))
    .merge(circle)
      .attr("cy", height / 2)
      .attr("cx", d => scale_x(d[scale_x_property]) + scale_x.bandwidth() / 2)
      .attr("r", d => scale_size(d.duration));

  text.enter().append("text")
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .text(d => d.note)
    .merge(text)
      .attr("x", d => scale_x(d[scale_x_property]) + scale_x.bandwidth() / 2)
      .attr("y", height / 2)
      .attr("dy", d => scale_size(d.duration) / 4)
      .style("font-size", d => scale_size(d.duration));

});

function getPressedNote(key){
  var pressedNote = allNotes.filter(d => d.keyboard == key);
  return pressedNote.length == 0 ? defaultNote : pressedNote[0];
}

function removeItem(arr, item){
  var index = arr.indexOf(item);
  if (index > -1){
    arr.splice(index, 1);
  }
  return arr;
}

// resize
d3.select(window).on("resize", () => {
    
  // dimensions
  width = window.innerWidth, height = window.innerHeight;
  svg.attr("width", width).attr("height", height);
  // scales
  scale_x.range([200, width - 200]);
  scale_size.range([0, height]);
  
  line
    .attr("x1", scale_x(allNotes[0][scale_x_property]) + scale_x.bandwidth() / 2)
    .attr("y1", height / 2)
    .attr("x2", scale_x(allNotes[allNotes.length - 1].id) + scale_x.bandwidth() / 2)
    .attr("y2", height / 2)
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
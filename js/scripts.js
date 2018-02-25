// notes
var changeKey = 1

var c4 = {frequency: 261.63 / changeKey, note: "C"},
	d4 = {frequency: 293.66 / changeKey, note: "D"},
	e4 = {frequency: 329.63 / changeKey, note: "E"},
	f4 = {frequency: 349.23 / changeKey, note: "F"},
	g4 = {frequency: 392.00 / changeKey, note: "G"},
	a4 = {frequency: 440 / changeKey, note: "A"},
	b4 = {frequency: 493.88 / changeKey, note: "B"},
	c5 = {frequency: 523.25 / changeKey, note: "C"};

var mapper = {
	a: c4,
	s: d4,
	d: e4,
	f: f4,
	j: g4,
	k: a4,
	l: b4,
	";": c5
}

// set up display
var width = window.innerWidth, height = window.innerHeight;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

var line = svg.append("line").style("stroke", "#ccc");

var circle = svg.append("circle")
		.attr("cx", width / 2)
		.attr("cy", height / 2);

var text = svg.append("text")
		.attr("y", height / 2)
		.style("text-anchor", "middle")
		.style("fill", "#fff");

var scale_size = d3.scaleLinear().range([0, height]).domain([0, 1200]);
var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain([c4.frequency, c5.frequency]);
var scale_x = d3.scaleLinear().range([200, width - 200]).domain([c4.frequency, c5.frequency]);

// keypress and timer logic
var isPressed = false;
var key;
var t = d3.timer(() => {});
t.stop();

line
	.attr("x1", scale_x(c4.frequency))
	.attr("y1", height / 2)
	.attr("x2", scale_x(c5.frequency))
	.attr("y2", height / 2);

// audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var isPlaying = false;
var sourceNode = null;
var analyser = null;


d3.select(window).on("resize", () => {
	width = window.innerWidth, height = window.innerHeight;
	svg.attr("width", width).attr("height", height);
	circle.attr("cx", width / 2).attr("cy", height / 2);
	text.attr("x", width / 2).attr("y", height / 2);
	scale_size.range([0, height]);
});

d3.select(document).on("keypress", () => {
	
	if (isPressed == false && isPlaying == false){
		isPressed = true;
		isPlaying = true;

		key = d3.event.key;	
		var n = mapper[key]
		note = n ? n.frequency : c4.frequency;

		t.restart((elapsed) => {
			// display
			circle
				.attr("r", scale_size(elapsed))
				.attr("cx", scale_x(note))
				.style("fill", scale_color(note));
			
			text
				.style("font-size", scale_size(elapsed))
				.attr("dy", (scale_size(elapsed) / 4) + "px")
				.attr("x", scale_x(note))
				.text(n ? n.note : c4.note);	
			
		});

		// audio
		sourceNode = audioContext.createOscillator();
		sourceNode.frequency.value = note;
		analyser = audioContext.createGain();
		sourceNode.connect( analyser );
		analyser.connect( audioContext.destination );

		sourceNode.start(0);
	}

}).on("keyup", () => {
	isPressed = false;
	key = "";
	t.stop();
	
	circle.transition().duration(200).attr("r", 0);
	text.transition().duration(200).style("font-size", 0);

	analyser.gain.setTargetAtTime(0, audioContext.currentTime, 0.2);
	
  sourceNode = null;
  analyser = null;
  isPlaying = false;
});
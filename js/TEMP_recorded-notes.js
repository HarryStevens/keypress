var allNotes = [{"frequency":261.63,"note":"C","octave":4,"keyboard":"q","index":0,"middle":2,"id":"C4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":293.66,"note":"D","octave":4,"keyboard":"w","index":1,"middle":2,"id":"D4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":329.63,"note":"E","octave":4,"keyboard":"e","index":2,"middle":2,"id":"E4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":349.23,"note":"F","octave":4,"keyboard":"r","index":3,"middle":2,"id":"F4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":392,"note":"G","octave":4,"keyboard":"u","index":4,"middle":2,"id":"G4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":440,"note":"A","octave":4,"keyboard":"i","index":5,"middle":2,"id":"A4","duration":0,"timer":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":493.88,"note":"B","octave":4,"keyboard":"o","index":6,"middle":2,"id":"B4","duration":0,"timer":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":523.25,"note":"C","octave":5,"keyboard":"p","index":7,"middle":2,"id":"C5","duration":0,"timer":{"_next":null,"_time":null,"_call":null},"oscillator":null,"gain":null}]

var width = window.innerWidth, height = window.innerHeight;

var svg_4d = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

var scale_x_4d = d3.scaleBand().rangeRound([0, width]).domain(allNotes.map(d => d.id));
var scale_size_4d = d3.scaleLinear().range([5, 40]);
var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain(d3.extent(allNotes, d => d.frequency));

svg_4d.append("g")
  .attr("transform", "translate(0, " + (height / 2 + 100) + ")")
  .call(d3.axisBottom(scale_x_4d).tickFormat(d => d[0]))

d3.json("data/sample_data.json", (error, recordedNotes) => {
  if (error) throw error;

  scale_size_4d.domain(d3.extent(recordedNotes, d => d.duration))

	recordedNotes.forEach(note => {
		note.uid = jz.str.randomString(20);
    note.x = scale_x_4d(note.id) + scale_x_4d.bandwidth() / 2;
    note.y = height / 2;
		return note;
	});

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
        .data(recordedNotes, d => d.uid);
		
		circle.enter().append("circle")
        .attr("r", d => scale_size_4d(d.duration))
        .style("fill", d => scale_color(d.frequency))
        .style("stroke", "#fff")
      .merge(circle)
				.attr("cx", d => d.x)
        .attr("cy", d => d.y);

  }  

  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, recordedNotes.filter(filter)); };
    return force;
  }

});
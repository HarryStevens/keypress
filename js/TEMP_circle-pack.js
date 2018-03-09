var allNotes = [{"frequency":261.63,"note":"C","octave":4,"keyboard":"q","index":0,"middle":2,"id":"C4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":293.66,"note":"D","octave":4,"keyboard":"w","index":1,"middle":2,"id":"D4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":329.63,"note":"E","octave":4,"keyboard":"e","index":2,"middle":2,"id":"E4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":349.23,"note":"F","octave":4,"keyboard":"r","index":3,"middle":2,"id":"F4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":392,"note":"G","octave":4,"keyboard":"u","index":4,"middle":2,"id":"G4","duration":0,"timer":{"_next":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":440,"note":"A","octave":4,"keyboard":"i","index":5,"middle":2,"id":"A4","duration":0,"timer":{"_next":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":493.88,"note":"B","octave":4,"keyboard":"o","index":6,"middle":2,"id":"B4","duration":0,"timer":{"_next":{"_next":null,"_time":null,"_call":null},"_time":null,"_call":null},"oscillator":null,"gain":null},{"frequency":523.25,"note":"C","octave":5,"keyboard":"p","index":7,"middle":2,"id":"C5","duration":0,"timer":{"_next":null,"_time":null,"_call":null},"oscillator":null,"gain":null}]

var width = window.innerWidth, height = window.innerHeight;
var pack_svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

var scale_color = d3.scaleLinear().range(["tomato", "steelblue"]).domain(d3.extent(allNotes, d => d.frequency));

d3.json("data/sample_data.json", (err, recordedNotes) => {
	
	recordedNotes.forEach(note => {
		note.uid = jz.str.randomString(20);
  	return note;
	});

	var h = d3.hierarchy({children: recordedNotes})
      .sum(d => d.duration);

  var circle = pack_svg.selectAll("path")
      .data(pack(h).leaves(), d => d.data.uid)

  circle.enter().append("path")
  		.attr("d", d => shape2path.circle({cx: d.x, cy: d.y, r: d.r}))
  		.style("fill", d => scale_color(d.data.frequency))

  // var circle = pack_svg.selectAll("circle")
  //     .data(pack(h).leaves(), d => d.data.uid)

  // circle.enter().append("circle")
  // 		.attr("r", d => d.r)
  // 		.attr("cx", d => d.x)
  // 		.attr("cy", d => d.y)
  		// .attr("d", d => shape2path.circle({cx: d.x, cy: d.y, r: d.r}))


});
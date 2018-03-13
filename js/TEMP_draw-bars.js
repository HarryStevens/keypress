function drawBars(){

  d3.select("line").transition().style("opacity", 0)

  var data = dimension_options.on.data;

  var margin = {left: 200, right: 200, top: window.innerHeight / 4, bottom: window.innerHeight / 4};

  var inner_width = window.innerWidth - margin.left - margin.right,
    inner_height = window.innerHeight - margin.top - margin.bottom;

  var ids = dimension_options.off.data.map(d => d.id);

  var bar_x = d3.scaleBand()
      .rangeRound([margin.left, window.innerWidth - margin.right])
      .domain(ids)
      .padding(.5);

  var out = [];
  ids.forEach(id => {
    var matches = data.filter(d => d.id == id);

    matches.forEach((d, i) => {
      d.notes_count = matches.length;
      d.note_index = i + 1;
      out.push(d);
    });

  });

  var max_notes = d3.max(out, d => d.notes_count);

  var bar_y = d3.scaleLinear()
      .range([window.innerHeight - margin.top, margin.bottom])
      .domain([0, max_notes]);

  circle = svg.selectAll(".circle")
      .data(out, d => d.uid)

  circle.transition()
    .duration(1500)
      .attrTween("d", (d, i) => {
        if (i == 0) {
          console.log(shape2path.circle({cx: d.x, cy: d.y, r: scale_size(d[size_data_value])}));
          console.log(" ");
          console.log(shape2path.rect({x: bar_x(d.id), y: bar_y(d.note_index), width: bar_x.bandwidth(), height: inner_height / max_notes}));
        }
        return flubber.interpolate(flubber.splitPathString(shape2path.circle({cx: d.x, cy: d.y, r: scale_size(d[size_data_value])}))[1], shape2path.rect({x: bar_x(d.id), y: bar_y(d.note_index), width: bar_x.bandwidth(), height: inner_height / max_notes}))
      });
  
  circle.enter().append("path")
      .attr("class", d => "circle circle-" + d.id)
      .attr("d", d => shape2path.rect({x: bar_x(d.id), y: bar_y(d.note_index), width: bar_x.bandwidth(), height: inner_height / max_notes}))
      .style("fill", d => scale_color(d[color_data_value]))
      .style("display", d3.selectAll("input[name='circle']:checked").property("value"))

}
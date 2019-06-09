const data = [{"continent":"Asia","population":4157300000},{"continent":"Africa","population":1030400000},{"continent":"Europe","population":738600000},{"continent":"N. America","population":461114000},{"continent":"S. America","population":390700000},{"continent":"Australia","population":36700000}];
const startAngle = -90, margin = {left: 90, right: 42, top: 0, bottom: 0};
const pieWidth = 800, pieHeight = 500, barWidth = pieWidth - margin.left - margin.right, barHeight = pieHeight - margin.top - margin.bottom;
const duration = 1000;
const australiaOffset = 90;

const pieGenerator = d3.pie()
    .value(d => d.population)
    .sort((a, b) => data.indexOf(d => d.continent === a.data.continent) - data.indexOf(d => d.continent === b.data.continent))
    .startAngle(geometric.degreesToRadians(startAngle))
    .endAngle(geometric.degreesToRadians(360 + startAngle));

const arcGenerator = d3.arc()
    .outerRadius(pieHeight / 2)
    .innerRadius(0);

const donutGenerator = d3.arc()
    .outerRadius(pieHeight / 2)
    .innerRadius(100);

const arcs = pieGenerator(data);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, barWidth]);

const yScale = d3.scaleBand()
    .domain(data.map(d => d.continent))
    .range([0, barHeight])
    .padding(.2);

const rectGenerator = shape2path.rect()
    .attr("x", 0)
    .attr("y", d => yScale(d.data.continent))
    .attr("height", d => yScale.bandwidth())
    .attr("width", d => xScale(d.data.population));

const svg = d3.select(".chart").append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight);

const g = svg.append("g")
    .attr("transform", "translate(" + [pieWidth / 2, pieHeight / 2] + ")");

const shapes = g.selectAll("path")
    .data(arcs, d => d.data.continent)
  .enter().append("path")
    .attr("class", d => "shape " + jz.str.toSlugCase(d.data.continent))
    .attr("d", arcGenerator);

const labels = g.selectAll("text.label")
    .data(arcs, d => d.data.continent)
  .enter().append("text")
    .attr("class", d => "label " + jz.str.toSlugCase(d.data.continent))
    .text(d => d.data.continent)
    .attr("dy", 6)
    .attr("x", d => arcLabel(d)[0] - (d.data.continent === "Australia" ? australiaOffset : 0))
    .attr("y", d => arcLabel(d)[1]);

const values = g.selectAll("text.value")
    .data(arcs, d => d.data.continent)
  .enter().append("text")
    .attr("class", d => "value " + jz.str.toSlugCase(d.data.continent))
    .text(d => valueFormat(d.data.population))
    .attr("dy", 28)
    .attr("x", d => arcLabel(d)[0] - (d.data.continent === "Australia" ? australiaOffset : 0))
    .attr("y", d => arcLabel(d)[1]);

const innerCircle = g.append("circle")
    .attr("r", 0);

function arcLabel(d){
  const start = geometric.radiansToDegrees(d.startAngle),
        end = geometric.radiansToDegrees(d.endAngle);
  return geometric.pointTranslate([0, 0], startAngle + (start + end) / 2, pieHeight / 2.5);
}

function valueFormat(val){
  return val >= 1e9 ? (val / 1e9).toFixed(1) + "b" : val >= 1e6 ? (val / 1e6).toFixed(0) + "m" : 0;
}

const to = {
  pie: toPie,
  bar: toBar
}

function toPie(){
  g.transition().duration(duration)
      .attrTween("transform", _ => {
        const iLeft = d3.interpolate(margin.left, pieWidth / 2),
              iTop = d3.interpolate(margin.top, pieHeight / 2);

        return t => "translate(" + [iLeft(t), iTop(t)] + ")"
      });
  
  shapes.transition().duration(duration)
      .attrTween("d", d => flubber.interpolate(rectGenerator(d), donutGenerator(d)));

  labels.transition().duration(duration)
      .attr("x", d => arcLabel(d)[0] - (d.data.continent === "Australia" ? australiaOffset : 0))
      .attr("y", d => arcLabel(d)[1])
      .attr("dx", 0);

  values.transition().duration(duration)
      .attr("dx", 0)
      .attr("dy", 28)
      .attr("x", d => arcLabel(d)[0] - (d.data.continent === "Australia" ? australiaOffset : 0))
      .attr("y", d => arcLabel(d)[1]);          

  d3.timeout(_ => {
    shapes
        .attr("d", arcGenerator);

    innerCircle
        .style("opacity", 1)
      .transition().duration(duration)
        .attr("r", 0);
  }, duration);


}

function toBar(){
  innerCircle.transition().duration(duration)
      .attr("r", 100);

  d3.timeout(_ => {
    innerCircle.style("opacity", 0);

    g.transition().duration(duration)
        .attrTween("transform", _ => {
          const iLeft = d3.interpolate(pieWidth / 2, margin.left),
                iTop = d3.interpolate(pieHeight / 2, margin.top);

          return t => "translate(" + [iLeft(t), iTop(t)] + ")"
        });

    shapes.transition().duration(duration)
        .attrTween("d", d => flubber.interpolate(donutGenerator(d), rectGenerator(d)));

    labels.transition().duration(duration)
        .attr("x", -10)
        .attr("y", d => yScale(d.data.continent) + yScale.bandwidth() / 2)
        .attr("dx", (d, i, e) => -e[i].getBoundingClientRect().width / 2);

    values.transition().duration(duration) 
        .attr("x", d => xScale(d.data.population))
        .attr("y", d => yScale(d.data.continent) + yScale.bandwidth() / 2)
        .attr("dy", 6)
        .attr("dx", (d, i, e) => 10 + e[i].getBoundingClientRect().width / 2);

  }, duration);
}

d3.selectAll(".button")
  .on("click", function(){
    const active = !!+d3.select(this).attr("data-active");
    
    if (!active){
      const type = d3.select(this).attr("data-chart");
      const other = type === "bar" ? "pie" : "bar";
      d3.select(".button." + type)
          .classed("inactive", 0)
          .classed("active", 1)
          .attr("data-active", 1)
      d3.select(".button." + other)
          .classed("inactive", 1)
          .classed("active", 0)
          .attr("data-active", 0);

      to[type]();          
    }
  });

d3.select(".hide-text").on("click", function(){
  values.classed("hiding", d3.select(this).property("checked"));
});
d3.select(".remove-color").on("click", function(){
  shapes.classed("no-color", d3.select(this).property("checked"));
});
// Dimensions
const margin = {left: 50, right: 6, top: 10, bottom: 30};
const width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

// Scales
const xScale = d3.scaleBand()
    .domain(d3.range(1960, 2018))
    .range([0, width])
    .padding(.1);
const xFacet = d3.scaleBand()
    .domain(["Japan", "Germany", "Nigeria"])
    .range([0, xScale.bandwidth()])
    .padding(.1);
const yScale = d3.scaleLinear()
    .domain([0, 2e8])
    .range([height, 0]);

// Generators
let xAxisValues = d3.range(1960, 2020, 10);
xAxisValues.push(2017);
const xAxisGenerator = d3.axisBottom(xScale)
    .tickValues(xAxisValues)
    .tickSize(20);

const yAxisGenerator = d3.axisLeft(yScale)
    .tickValues([0, 5e7, 10e7, 15e7, 20e7])
    .tickSize(width + 20)
    .tickFormat(d => d > 0 ? `${d / 1e6}m` : 0)

const rectGenerator = shape2path.rect()
    .attr("width", xFacet.bandwidth())
    .attr("height", d => height - yScale(d.population));

const lineGenerator = shape2path.rect()
    .attr("x", d => 0)
    .attr("width", d => geometric.lineLength([[d.x1, d.y1], [d.x2, d.y2]]))
    .attr("y", d => 0)
    .attr("height", 2);

const circleGenerator = shape2path.circle()
    .attr("r", 4)
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.population));

// Append
const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
const g = svg.append("g")
    .attr("transform", "translate(" + [margin.left, margin.top] + ")");
const xAxis = g.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisGenerator);
const yAxis = g.append("g")
    .attr("class", "axis y")
    .attr("transform", "translate(" + width + ")")
    .call(yAxisGenerator);

d3.json("data/populations-tidy.json", (err, data) => {
  const shapes = g.selectAll(".shape")
      .data(data, d => d.year + d.country)
    .enter().append("path")
      .attr("class", d => "shape " + jz.str.toSlugCase(d.country))
      .attr("transform", d => "translate(" + [xScale(d.year) + xFacet(d.country), yScale(d.population)] + ")")
      .attr("d", rectGenerator);

  d3.selectAll(".button")
    .on("click", function(){
      const active = !!+d3.select(this).attr("data-active");
      
      if (!active){
        const type = d3.select(this).attr("data-chart");
        const other = type === "bar" ? "line" : "bar";
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
    })

  // Functions
  const to = {
    line: toLine,
    bar: toBar
  }

  function toLine(){
    shapes.transition().duration(1000)
        .attr("transform", d => {
          const next = data.filter(f => f.country === d.country && f.year === d.year + 1)[0];
          const x1 = xScale(d.year);
          const x2 = xScale(next ? next.year : d.year);
          const y1 = yScale(d.population);
          const y2 = yScale(next ? next.population : d.population);
          return "translate(" + [x1, y1 + 2] + ") rotate(" + geometric.lineAngle([[x1, y1], [x2, y2]]) + ")";
        })             
        .attrTween("d", d => {
          const next = data.filter(f => f.country === d.country && f.year === d.year + 1)[0];
          const x1 = xScale(d.year);
          const x2 = xScale(next ? next.year : d.year);
          const y1 = yScale(d.population);
          const y2 = yScale(next ? next.population : d.population);// console.log(circle, line);
          return flubber.interpolate(rectGenerator(d), lineGenerator({x1, x2, y1, y2}));
        });
  
  }

  function toBar(){
    shapes.transition().duration(1000)
        .attr("transform", d => "translate(" + [xScale(d.year) + xFacet(d.country), yScale(d.population)] + ")")           
        .attrTween("d", d => {
          const next = data.filter(f => f.country === d.country && f.year === d.year + 1)[0];
          const x1 = xScale(d.year);
          const x2 = xScale(next ? next.year : d.year);
          const y1 = yScale(d.population);
          const y2 = yScale(next ? next.population : d.population);// console.log(circle, line);
          return flubber.interpolate(lineGenerator({x1, x2, y1, y2}), rectGenerator(d));
        });
  }
});

const legendItems = d3.selectAll(".legend-item");

let selStartLeft = 0, selStartTop = 0,
    dragStartLeft = 0, dragStartTop = 0,
    offsetLeft = 0, offsetTop = 0;

const dragGenerator = d3.drag()
  .on("start", function(){
    const box = this.getBoundingClientRect();

    offsetLeft = event.clientX - (box.x || box.left);
    offsetTop = event.clientY - (box.y || box.top);
  })
  .on("drag", function(){
    d3.select(this)
        .style("left", `${event.clientX - offsetLeft}px`)
        .style("top", `${event.clientY - offsetTop}px`);
  });

legendItems.call(dragGenerator);
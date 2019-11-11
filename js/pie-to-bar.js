const countryData = [{"country":"China","continent":"Asia","population":1433783686},{"country":"India","continent":"Asia","population":1366417754},{"country":"USA","continent":"N. America","population":329064917},{"country":"Indonesia","continent":"Asia","population":270625568},{"country":"Pakistan","continent":"Asia","population":216565318},{"country":"Brazil","continent":"S. America","population":211049527},{"country":"Nigeria","continent":"Africa","population":200963599},{"country":"Bangladesh","continent":"Asia","population":163046161},{"country":"Russia","continent":"Europe","population":145872256},{"country":"Mexico","continent":"N. America","population":127575529},{"country":"Japan","continent":"Asia","population":126860301},{"country":"Ethiopia","continent":"Africa","population":112078730},{"country":"Philippines","continent":"Asia","population":108116615},{"country":"Egypt","continent":"Africa","population":100388073},{"country":"Vietnam","continent":"Asia","population":96462106},{"country":"Democratic Republic of the Congo","continent":"Africa","population":86790567},{"country":"Germany","continent":"Europe","population":83517045},{"country":"Turkey","continent":"Asia","population":83429615},{"country":"Iran","continent":"Asia","population":82913906},{"country":"Thailand","continent":"Asia","population":69037513},{"country":"United Kingdom","continent":"Europe","population":67530172},{"country":"France","continent":"Europe","population":65129728},{"country":"Italy","continent":"Europe","population":60550075},{"country":"South Africa","continent":"Africa","population":58558270},{"country":"Tanzania","continent":"Africa","population":58005463},{"country":"Myanmar","continent":"Asia","population":54045420},{"country":"Kenya","continent":"Africa","population":52573973},{"country":"South Korea","continent":"Asia","population":51225308},{"country":"Colombia","continent":"S. America","population":50339443},{"country":"Spain","continent":"Europe","population":46736776},{"country":"Argentina","continent":"S. America","population":44780677},{"country":"Uganda","continent":"Africa","population":44269594},{"country":"Ukraine","continent":"Europe","population":43993638},{"country":"Algeria","continent":"Africa","population":43053054},{"country":"Sudan","continent":"Africa","population":42813238},{"country":"Iraq","continent":"Asia","population":39309783},{"country":"Afghanistan","continent":"Asia","population":38041754},{"country":"Poland","continent":"Europe","population":37887768},{"country":"Canada","continent":"N. America","population":37411047},{"country":"Morocco","continent":"Africa","population":36471769},{"country":"Saudi Arabia","continent":"Asia","population":34268528},{"country":"Uzbekistan","continent":"Asia","population":32981716},{"country":"Peru","continent":"S. America","population":32510453},{"country":"Malaysia","continent":"Asia","population":31949777},{"country":"Angola","continent":"Africa","population":31825295},{"country":"Mozambique","continent":"Africa","population":30366036},{"country":"Yemen","continent":"Asia","population":29161922},{"country":"Ghana","continent":"Africa","population":28833629},{"country":"Nepal","continent":"Asia","population":28608710},{"country":"Venezuela","continent":"S. America","population":28515829},{"country":"Madagascar","continent":"Africa","population":26969307},{"country":"Cameroon","continent":"Africa","population":25876380},{"country":"Ivory Coast","continent":"Africa","population":25716544},{"country":"North Korea","continent":"Asia","population":25666161},{"country":"Australia","continent":"Oceania","population":25203198},{"country":"Taiwan","continent":"Asia","population":23773876},{"country":"Niger","continent":"Africa","population":23310715},{"country":"Sri Lanka","continent":"Asia","population":21323733},{"country":"Burkina Faso","continent":"Africa","population":20321378},{"country":"Mali","continent":"Africa","population":19658031},{"country":"Romania","continent":"Europe","population":19364557},{"country":"Chile","continent":"S. America","population":18952038},{"country":"Malawi","continent":"Africa","population":18628747},{"country":"Kazakhstan","continent":"Asia","population":18551427},{"country":"Zambia","continent":"Africa","population":17861030},{"country":"Guatemala","continent":"N. America","population":17581472},{"country":"Ecuador","continent":"S. America","population":17373662},{"country":"Netherlands","continent":"Europe","population":17097130},{"country":"Syria","continent":"Asia","population":17070135},{"country":"Cambodia","continent":"Asia","population":16486542},{"country":"Senegal","continent":"Africa","population":16296364},{"country":"Chad","continent":"Africa","population":15946876},{"country":"Somalia","continent":"Africa","population":15442905},{"country":"Zimbabwe","continent":"Africa","population":14645468},{"country":"Guinea","continent":"Africa","population":12771246},{"country":"Rwanda","continent":"Africa","population":12626950},{"country":"Benin","continent":"Africa","population":11801151},{"country":"Tunisia","continent":"Africa","population":11694719},{"country":"Belgium","continent":"Europe","population":11539328},{"country":"Bolivia","continent":"S. America","population":11513100},{"country":"Cuba","continent":"N. America","population":11333483},{"country":"Haiti","continent":"N. America","population":11263770},{"country":"South Sudan","continent":"Africa","population":11062113},{"country":"Burundi","continent":"Africa","population":10864245},{"country":"Dominican Republic","continent":"N. America","population":10738958},{"country":"Czech Republic","continent":"Europe","population":10689209},{"country":"Greece","continent":"Europe","population":10473455},{"country":"Portugal","continent":"Europe","population":10226187},{"country":"Jordan","continent":"Asia","population":10101694},{"country":"Azerbaijan","continent":"Asia","population":10047718},{"country":"Sweden","continent":"Europe","population":10036379},{"country":"United Arab Emirates","continent":"Asia","population":9770529},{"country":"Honduras","continent":"N. America","population":9746117},{"country":"Hungary","continent":"Europe","population":9684679},{"country":"Belarus","continent":"Europe","population":9452411},{"country":"Tajikistan","continent":"Asia","population":9321018},{"country":"Austria","continent":"Europe","population":8955102},{"country":"Papua New Guinea","continent":"Oceania","population":8776109},{"country":"Serbia","continent":"Europe","population":8772235},{"country":"Switzerland","continent":"Europe","population":8591365},{"country":"Israel","continent":"Asia","population":8519377},{"country":"Togo","continent":"Africa","population":8082366},{"country":"Sierra Leone","continent":"Africa","population":7813215},{"country":"Hong Kong","continent":"Asia","population":7436154},{"country":"Laos","continent":"Asia","population":7169455},{"country":"Paraguay","continent":"S. America","population":7044636},{"country":"Bulgaria","continent":"Europe","population":7000119},{"country":"Lebanon","continent":"Asia","population":6855713},{"country":"Libya","continent":"Africa","population":6777452},{"country":"Nicaragua","continent":"N. America","population":6545502},{"country":"El Salvador","continent":"N. America","population":6453553},{"country":"Kyrgyzstan","continent":"Asia","population":6415850},{"country":"Turkmenistan","continent":"Asia","population":5942089},{"country":"Singapore","continent":"Asia","population":5804337},{"country":"Denmark","continent":"Europe","population":5771876},{"country":"Finland","continent":"Europe","population":5532156},{"country":"Slovakia","continent":"Europe","population":5457013},{"country":"Congo","continent":"Africa","population":5380508},{"country":"Norway","continent":"Europe","population":5378857},{"country":"Costa Rica","continent":"N. America","population":5047561},{"country":"Palestine","continent":"Asia","population":4981420},{"country":"Oman","continent":"Asia","population":4974986},{"country":"Liberia","continent":"Africa","population":4937374},{"country":"Ireland","continent":"Europe","population":4882495},{"country":"New Zealand","continent":"Oceania","population":4783063},{"country":"Central African Republic","continent":"Africa","population":4745185},{"country":"Mauritania","continent":"Africa","population":4525696},{"country":"Panama","continent":"N. America","population":4246439},{"country":"Kuwait","continent":"Asia","population":4207083},{"country":"Croatia","continent":"Europe","population":4130304},{"country":"Moldova","continent":"Europe","population":4043263},{"country":"Georgia","continent":"Asia","population":3996765},{"country":"Eritrea","continent":"Africa","population":3497117},{"country":"Uruguay","continent":"S. America","population":3461734},{"country":"Bosnia and Herzegovina","continent":"Europe","population":3301000},{"country":"Mongolia","continent":"Asia","population":3225167},{"country":"Armenia","continent":"Asia","population":2957731},{"country":"Jamaica","continent":"N. America","population":2948279},{"country":"Puerto Rico","continent":"N. America","population":2933408},{"country":"Albania","continent":"Europe","population":2880917},{"country":"Qatar","continent":"Asia","population":2832067},{"country":"Lithuania","continent":"Europe","population":2759627},{"country":"Namibia","continent":"Africa","population":2494530},{"country":"The Gambia","continent":"Africa","population":2347706},{"country":"Botswana","continent":"Africa","population":2303697},{"country":"Gabon","continent":"Africa","population":2172579},{"country":"Lesotho","continent":"Africa","population":2125268},{"country":"North Macedonia","continent":"Europe","population":2083459},{"country":"Slovenia","continent":"Europe","population":2078654},{"country":"Guinea-Bissau","continent":"Africa","population":1920922},{"country":"Latvia","continent":"Europe","population":1906743},{"country":"Bahrain","continent":"Asia","population":1641172},{"country":"Trinidad and Tobago","continent":"N. America","population":1394973},{"country":"Equatorial Guinea","continent":"Africa","population":1355986},{"country":"Estonia","continent":"Europe","population":1325648},{"country":"East Timor","continent":"Asia","population":1293119},{"country":"Mauritius","continent":"Africa","population":1198575},{"country":"Cyprus","continent":"Asia","population":1179551},{"country":"Eswatini (Swaziland)","continent":"Africa","population":1148130},{"country":"Djibouti","continent":"Africa","population":973560},{"country":"Fiji","continent":"Oceania","population":889953},{"country":"RÃ©union","continent":"Africa","population":888927},{"country":"Comoros","continent":"Africa","population":850886},{"country":"Guyana","continent":"S. America","population":782766},{"country":"Bhutan","continent":"Asia","population":763092},{"country":"Solomon Islands","continent":"Oceania","population":669823},{"country":"Macau","continent":"Asia","population":640445},{"country":"Montenegro","continent":"Europe","population":627987},{"country":"Luxembourg","continent":"Europe","population":615729},{"country":"Western Sahara","continent":"Africa","population":582463},{"country":"Suriname","continent":"S. America","population":581372},{"country":"Cape Verde","continent":"Africa","population":549935},{"country":"Maldives","continent":"Asia","population":530953},{"country":"Guadeloupe","continent":"N. America","population":447905},{"country":"Malta","continent":"Europe","population":440372},{"country":"Brunei","continent":"Asia","population":433285},{"country":"Belize","continent":"N. America","population":390353},{"country":"Bahamas","continent":"N. America","population":389482},{"country":"Martinique","continent":"N. America","population":375554},{"country":"Iceland","continent":"Europe","population":339031},{"country":"Vanuatu","continent":"Oceania","population":299882},{"country":"Barbados","continent":"N. America","population":287025},{"country":"New Caledonia","continent":"Oceania","population":282750},{"country":"French Guiana","continent":"S. America","population":282731},{"country":"French Polynesia","continent":"Oceania","population":279287},{"country":"Mayotte","continent":"Africa","population":266150},{"country":"Sao Tome and Principe","continent":"Africa","population":215056},{"country":"Samoa","continent":"Oceania","population":197097},{"country":"Saint Lucia","continent":"N. America","population":182790},{"country":"Guernsey and Jersey","continent":"Europe","population":172259},{"country":"Guam","continent":"Oceania","population":167294},{"country":"Curacao","continent":"N. America","population":163424},{"country":"Kiribati","continent":"Oceania","population":117606},{"country":"Federated States of Micronesia","continent":"Oceania","population":113815},{"country":"Grenada","continent":"N. America","population":112003},{"country":"Tonga","continent":"Oceania","population":110940},{"country":"Saint Vincent and the Grenadines","continent":"N. America","population":110589},{"country":"Aruba","continent":"N. America","population":106314},{"country":"United States Virgin Islands","continent":"N. America","population":104578},{"country":"Seychelles","continent":"Africa","population":97739},{"country":"Antigua and Barbuda","continent":"N. America","population":97118},{"country":"Isle of Man","continent":"Europe","population":84584},{"country":"Andorra","continent":"Europe","population":77142},{"country":"Dominica","continent":"N. America","population":71808},{"country":"Cayman Islands","continent":"N. America","population":64948},{"country":"Bermuda","continent":"N. America","population":62506},{"country":"Marshall Islands","continent":"Oceania","population":58791},{"country":"Greenland","continent":"N. America","population":56672},{"country":"Northern Mariana Islands","continent":"Oceania","population":56188},{"country":"American Samoa","continent":"Oceania","population":55312},{"country":"Saint Kitts and Nevis","continent":"N. America","population":52823},{"country":"Faroe Islands","continent":"Europe","population":48678},{"country":"Sint Maarten","continent":"N. America","population":42388},{"country":"Monaco","continent":"Europe","population":38964},{"country":"Turks and Caicos Islands","continent":"N. America","population":38191},{"country":"Liechtenstein","continent":"Europe","population":38019},{"country":"San Marino","continent":"Europe","population":33860},{"country":"Gibraltar","continent":"Europe","population":33701},{"country":"British Virgin Islands","continent":"N. America","population":30030},{"country":"Caribbean Netherlands","continent":"N. America","population":25979},{"country":"Palau","continent":"Oceania","population":18008},{"country":"Cook Islands","continent":"Oceania","population":17548},{"country":"Anguilla","continent":"N. America","population":14869},{"country":"Tuvalu","continent":"Oceania","population":11646},{"country":"Wallis and Futuna","continent":"Oceania","population":11432},{"country":"Nauru","continent":"Oceania","population":10756},{"country":"Saint Helena, Ascension and Tristan da Cunha","continent":"Africa","population":6059},{"country":"Saint Pierre and Miquelon","continent":"N. America","population":5822},{"country":"Montserrat","continent":"N. America","population":4989},{"country":"Falkland Islands","continent":"S. America","population":3377},{"country":"Niue","continent":"Oceania","population":1615},{"country":"Tokelau","continent":"Oceania","population":1340},{"country":"Vatican City","continent":"Europe","population":799}];

const continentData = arr.sort(arr.unique(countryData, d => d.continent).map(continent => {
  return {
    continent,
    population: arr.sum(countryData.filter(f => f.continent === continent), d => d.population)
  }
}), d => d.population, "desc");

let type = "pie", lastType = "pie";

const tooltip = d3.select(".tooltip");

const startAngle = -90,
      barMargin = {left: 93, right: 42, top: 0, bottom: 0},
      treeMargin = {left: 2, right: 20, top: 20, bottom: 20};
const pieWidth = 800,
      pieHeight = 500,
      barWidth = pieWidth - barMargin.left - barMargin.right,
      barHeight = pieHeight - barMargin.top - barMargin.bottom,
      treeWidth = pieWidth - treeMargin.left - treeMargin.right,
      treeHeight = pieHeight - treeMargin.top - treeMargin.bottom;
const duration = 1000;
const oceaniaOffset = 90;

// Pie processing
const pieGenerator = d3.pie()
    .value(d => d.population)
    .sort((a, b) => continentData.indexOf(d => d.continent === a.data.continent) - continentData.indexOf(d => d.continent === b.data.continent))
    .startAngle(geometric.degreesToRadians(startAngle))
    .endAngle(geometric.degreesToRadians(360 + startAngle));

const arcGenerator = d3.arc()
    .outerRadius(pieHeight / 2)
    .innerRadius(0);

const donutGenerator = d3.arc()
    .outerRadius(pieHeight / 2)
    .innerRadius(100);

const arcs = pieGenerator(continentData);

// Bar processing
const xScale = d3.scaleLinear()
    .domain([0, d3.max(continentData, d => d.population)])
    .range([0, barWidth]);

const yScale = d3.scaleBand()
    .domain(continentData.map(d => d.continent))
    .range([0, barHeight])
    .padding(.2);

const rectGenerator = shape2path.rect()
    .attr("x", 0)
    .attr("y", d => yScale(d.data.continent))
    .attr("height", d => yScale.bandwidth())
    .attr("width", d => xScale(d.data.population));

// Stack processing
const stack = stackGenerator(countryData);

// Tree processing
const hierarchy = hierarchyGenerator();
const treemap = d3.treemap()
    .padding(1)
    .round(true)
    .size([treeWidth, treeHeight]);
const root = d3.hierarchy(hierarchy)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
const leaves = treemap(root).leaves();
const branches = treemap(root).ancestors()[0].children;

stack.forEach(d => {
  d.leaf = leaves.filter(f => f.data.name === d.country)[0];
  return d;
});

arcs.forEach((d, i) => {
  d.branch = branches[i];
  return d;
});

// SVG
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
  .enter().append("g")
    .attr("class", d => "label " + jz.str.toSlugCase(d.data.continent))
    .attr("transform", d => {
      const x = arcLabel(d)[0] - (d.data.continent === "Oceania" ? oceaniaOffset : 0);
      const y = arcLabel(d)[1];
      return "translate(" + [x, y] + ")";
    });

labels.append("text")
    .attr("class", "bg")
    .text(d => d.data.continent)
    .attr("dy", 6)

labels.append("text")
    .attr("class", "fg")
    .text(d => d.data.continent)
    .attr("dy", 6)

const values = g.selectAll("text.value")
    .data(arcs, d => d.data.continent)
  .enter().append("g")
    .attr("class", d => "value " + jz.str.toSlugCase(d.data.continent))
    .attr("transform", d => {
      const x = arcLabel(d)[0] - (d.data.continent === "Oceania" ? oceaniaOffset : 0);
      const y = arcLabel(d)[1];
      return "translate(" + [x, y] + ")";
    });

values.append("text")
    .attr("class", "bg")
    .text(d => valueFormat(d.data.population))
    .attr("dy", 28);

values.append("text")
    .attr("class", "fg")
    .text(d => valueFormat(d.data.population))
    .attr("dy", 28);

const innerCircle = g.append("circle")
    .attr("r", 0);

// Stack SVG
const stackRects = g.selectAll(".stack-rect")
    .data(stack)
  .enter().append("rect")
    .attr("class", d => "stack-rect " + jz.str.toSlugCase(d.continent) + " " + jz.str.toSlugCase(d.country))
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", 0)
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut);

const stackLines = g.selectAll(".stack-line")
    .data(stack)
  .enter().append("line")
    .attr("class", "stack-line")
    .attr("x1", d => d.x + d.width)
    .attr("x2", d => d.x + d.width)
    .attr("y1", d => d.y)
    .attr("y2", d => d.y);

const stackOutlines = g.selectAll(".stack-outline")
    .data(arcs)
  .enter().append("rect")
    .attr("class", d => "stack-outline " + jz.str.toSlugCase(d.data.continent))
    .attr("x", 0)
    .attr("y", d => yScale(d.data.continent))
    .attr("width", d => xScale(d.data.population))
    .attr("height", d => yScale.bandwidth())
    .style("opacity", 0);

const stackLabels = g.selectAll(".stack-label")
    .data(stack)
  .enter().append("g")
    .attr("class", d => "stack-label " + jz.str.toSlugCase(d.country))
    .attr("transform", d => "translate(" + [6 + d.x, 6 + d.y + yScale.bandwidth() / 2] + ")")
    .classed("show", 0);

stackLabels.append("text")
    .text(d => d.country);


const to = {
  pie: toPie,
  bar: toBar,
  stack: toStack,
  treemap: toTreemap
};

function toPie(){
  g.transition().duration(duration)
      .attrTween("transform", _ => {
        const iLeft = d3.interpolate(barMargin.left, pieWidth / 2),
              iTop = d3.interpolate(barMargin.top, pieHeight / 2);

        return t => "translate(" + [iLeft(t), iTop(t)] + ")"
      });
  
  shapes.transition().duration(duration)
      .attrTween("d", d => flubber.interpolate(rectGenerator(d), donutGenerator(d)));

  labels.transition().duration(duration)
      .attr("transform", d => {
        const x = arcLabel(d)[0] - (d.data.continent === "Oceania" ? oceaniaOffset : 0);
        const y = arcLabel(d)[1];
        return "translate(" + [x, y] + ")";
      })
      
  labels.selectAll("text").transition().duration(duration)
      .attr("dx", 0);

  values.transition().duration(duration)
      .attr("transform", d => {
        const x = arcLabel(d)[0] - (d.data.continent === "Oceania" ? oceaniaOffset : 0);
        const y = arcLabel(d)[1];
        return "translate(" + [x, y] + ")";
      });

  values.selectAll("text").transition().duration(duration)
      .attr("dx", 0)
      .attr("dy", 28);

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
  if (lastType === "pie"){
    innerCircle.transition().duration(duration)
        .attr("r", 100);

    d3.timeout(_ => {
      innerCircle.style("opacity", 0);

      g.transition().duration(duration)
          .attrTween("transform", _ => {
            const iLeft = d3.interpolate(pieWidth / 2, barMargin.left),
                  iTop = d3.interpolate(pieHeight / 2, barMargin.top);

            return t => "translate(" + [iLeft(t), iTop(t)] + ")"
          });

      shapes.transition().duration(duration)
          .attrTween("d", d => flubber.interpolate(donutGenerator(d), rectGenerator(d)));

      labels.transition().duration(duration)
          .attr("transform", d => {
            const x = -10;
            const y = yScale(d.data.continent) + yScale.bandwidth() / 2;
            return "translate(" + [x, y] + ")";
          });

      labels.selectAll("text").transition().duration(duration)
          .attr("dx", (d, i, e) => -e[i].getBoundingClientRect().width / 2);

      values.transition().duration(duration) 
          .attr("transform", d => {
            const x = xScale(d.data.population);
            const y = yScale(d.data.continent) + yScale.bandwidth() / 2;
            return "translate(" + [x, y] + ")";
          });

      values.selectAll("text").transition().duration(duration)
          .attr("dy", 6)
          .attr("dx", (d, i, e) => 10 + e[i].getBoundingClientRect().width / 2);

    }, duration);
  }

  if (lastType === "stack"){
    stackRects.transition().duration(duration)
        .attr("height", d => 0);

    stackLines.transition().duration(duration)
        .attr("y2", d => d.y);

    stackLabels
        .classed("show", 0);

    d3.timeout(_ => {
      stackOutlines.transition().duration(duration)
          .style("opacity", 0);

    }, duration);
  }

}

function toStack(){
  if (lastType === "bar"){
    stackOutlines.transition().duration(duration)
        .attr("x", 0)
        .attr("y", d => yScale(d.data.continent))
        .attr("width", d => xScale(d.data.population))
        .attr("height", d => yScale.bandwidth())
        .style("opacity", 1);

    d3.timeout(_ => {
      stackRects.transition().duration(duration)
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .attr("width", d => d.width)
          .attr("height", d => d.height);

      stackLines.transition().duration(duration)
          .attr("x1", d => d.x + d.width)
          .attr("x2", d => d.x + d.width)
          .attr("y1", d => d.y)
          .attr("y2", d => d.y + d.height + 1);

      stackLabels
          .classed("show", d => ["China", "India", "USA"].includes(d.country));

    }, duration);
  }

  if (lastType === "treemap"){
    g.transition().duration(duration)
        .attrTween("transform", _ => {
          const iLeft = d3.interpolate(treeMargin.left, barMargin.left),
                iTop = d3.interpolate(treeMargin.top, barMargin.top);

          return t => "translate(" + [iLeft(t), iTop(t)] + ")"
        });

    stackOutlines.transition().duration(duration)
        .attr("x", 0)
        .attr("y", d => yScale(d.data.continent))
        .attr("width", d => xScale(d.data.population))
        .attr("height", d => yScale.bandwidth())
        .style("opacity", 1);
  
    stackRects
        .style("stroke", "#fff")
      .transition().duration(duration)
        .style("stroke-width", "1.5px")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.width)
        .attr("height", d => d.height);

    labels
        .classed("color", 0)
      .transition().duration(duration)
        .attr("transform", d => {
          const x = -10;
          const y = yScale(d.data.continent) + yScale.bandwidth() / 2;
          return "translate(" + [x, y] + ")";
        });

    values.transition().duration(duration) 
        .attr("transform", d => {
          const x = xScale(d.data.population);
          const y = yScale(d.data.continent) + yScale.bandwidth() / 2;
          return "translate(" + [x, y] + ")";
        });

    stackLabels
        .classed("show", d => ["China", "India", "USA"].includes(d.country))
      .transition().duration(duration)
        .attr("transform", d => "translate(" + [6 + d.x, 6 + d.y + yScale.bandwidth() / 2] + ")");

    d3.timeout(_ => {

      stackRects
          .style("stroke", "none")

      stackLines
          .attr("x1", d => d.x + d.width)
          .attr("x2", d => d.x + d.width)
          .attr("y1", d => d.y)
          .attr("y2", d => d.y + d.height + 1)
          .style("opacity", 1);  

      shapes
          .style("opacity", 1);

    }, duration);

  }

}

function toTreemap(){
  g.transition().duration(duration)
      .attr("transform", d => "translate(" + [treeMargin.left, treeMargin.top] + ")");

  labels
      .classed("color", 1)
    .transition().duration(duration)
      .attr("transform", (d, i, e) => {
        const sel = d3.select(e[i]);
        const box = sel.node().getBoundingClientRect();
        const bWidth = box.width;

        if (["Asia", "Africa", "Europe"].includes(d.data.continent)){
          return "translate(" + [bWidth + d.branch.x0, d.branch.y0 - 14] + ")";  
        }
        else if (["N. America", "Oceania"].includes(d.data.continent)){
          return "translate(" + [bWidth + d.branch.x0, d.branch.y1 + 12] + ")";
        }
        else {
          return "translate(" + [treeWidth + 12, d.branch.y0 + bWidth] + ") rotate(90)";
        }
      });

  values
    .transition().duration(duration)
      .attr("transform", (d, i, e) => {
        const sel = d3.select(".label." + jz.str.toSlugCase(d.data.continent));
        const box = sel.node().getBoundingClientRect();
        const bWidth = box.width;

        if (["Asia", "Africa", "Europe"].includes(d.data.continent)){
          return "translate(" + [bWidth + d.branch.x0, d.branch.y0 - 14] + ")";  
        }
        else if (["N. America", "Oceania"].includes(d.data.continent)){
          return "translate(" + [bWidth + d.branch.x0, d.branch.y1 + 12] + ")";
        }
        else {
          return "translate(" + [treeWidth + 12, d.branch.y0 + bWidth] + ") rotate(90)";
        }
      });

  shapes
      .style("opacity", 0);

  stackLines
      .style("opacity", 0);

  stackRects
      .style("stroke", "#fff")
      .style("stroke-width", "1.5px")
    .transition().duration(duration)
      .style("stroke-width", "0px")
      .attr("x", d => d.leaf.x0)
      .attr("y", d => d.leaf.y0)
      .attr("width", d => d.leaf.x1 - d.leaf.x0)
      .attr("height", d => d.leaf.y1 - d.leaf.y0);

  stackOutlines.transition().duration(duration)
      .attr("x", d => d.branch.x0)
      .attr("y", d => d.branch.y0)
      .attr("width", d => d.branch.x1 - d.branch.x0)
      .attr("height", d => d.branch.y1 - d.branch.y0);

  stackLabels
    .transition().duration(duration)
      .attr("transform", d => "translate(" + [d.leaf.x0 + 4, d.leaf.y0 + 18] + ")");

  setTimeout(_ => {
    stackLabels.classed("show", d => ["China", "India", "USA", "Mexico", "Indonesia", "Pakistan", "Nigeria", "Russia", "Brazil"].includes(d.country))
  }, duration / 2);
}

d3.selectAll(".button")
  .on("click", function(){
    const active = !!+d3.select(this).attr("data-active");
    
    if (!active){
      lastType = type;
      type = d3.select(this).attr("data-chart");
      
      d3.selectAll(".button")
          .classed("inactive", 1)
          .classed("active", 0)
          .attr("data-active", 0);

      d3.select(".button." + type)
          .classed("inactive", 0)
          .classed("active", 1)
          .attr("data-active", 1)

      to[type]();          
    }
  });

d3.select(".hide-text").on("click", function(){
  values.classed("hiding", d3.select(this).property("checked"));
});
d3.select(".remove-color").on("click", function(){
  shapes.classed("no-color", d3.select(this).property("checked"));
});

// Stack data processing
function stackGenerator(data){
  let out = [];
  const keys = {};

  continentData.forEach(d => {
    keys[d.continent] = 0;
  });

  for (let i = 0, l = countryData.length; i < l; i++){
    const d = data[i];
    const width = xScale(d.population);
    out.push({
      ...d,
      x: keys[d.continent],
      y: yScale(d.continent),
      width,
      height: yScale.bandwidth()
    });
    keys[d.continent] += width;
  }

  return out;
}

function hierarchyGenerator(){
  return {
    name: "root",
    children: continentData.map(continent => {
      return {
        name: continent.continent,
        children: countryData.filter(f => f.continent === continent.continent).map(country => {
          return {
            name: country.country,
            value: country.population
          };
        })
      };
    })
  };
}

function arcLabel(d){
  const start = geometric.radiansToDegrees(d.startAngle),
        end = geometric.radiansToDegrees(d.endAngle);
  return geometric.pointTranslate([0, 0], startAngle + (start + end) / 2, pieHeight / 2.5);
}

function valueFormat(val){
  return val >= 1e9 ? (val / 1e9).toFixed(1) + "b" : val >= 1e6 ? (val / 1e6).toFixed(0) + "m" : 0;
}

function mouseOver(d, i, e){
  tooltip.select(".country")
      .attr("class", "country " + jz.str.toSlugCase(d.continent))
      .text(d.country);

  tooltip.select(".population").text(jz.str.numberCommas(d.population));

  const tipBox = tooltip.node().getBoundingClientRect();
  const tipWidth = tipBox.width;
  const tipHeight = tipBox.height;

  const rect = d3.select(e[i]);
  const rectBox = rect.node().getBoundingClientRect();
  const rectTop = rectBox.y || rectBox.top;
  const rectLeft = rectBox.x;
  const rectWidth = rectBox.width;

  const tipLeft = rectLeft + rectWidth / 2 - tipWidth / 2;
  const tipTop = rectTop - tipHeight + scrollY - 12;

  tooltip
      .style("left", tipLeft + "px")
      .style("top", tipTop + "px")
      .classed("active", 1);

  rect
      .style("stroke", "#000")
      .style("stroke-width", "3px")
      .classed("active", 1)
      .raise();

  d3.select(".stack-label." + jz.str.toSlugCase(d.country))
      .raise();
}

function mouseOut(d, i, e){
  tooltip
      .style("left", "-1000px")
      .style("top", "-1000px")
      .classed("active", 0);

  d3.select(e[i])
      .style("stroke", "none")
      .style("stroke-width", "0")
      .classed("active", 0)
      .lower();

  shapes.lower();
}
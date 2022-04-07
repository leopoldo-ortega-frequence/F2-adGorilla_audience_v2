// import render from "./graph.js"

// global variables
export const drawGraph = (selection, props) => {
  const { data, width, height, xAxisTitle, yAxisTitle } = props;
  data.forEach((d) => {
    d.r = d.r + 2;
  })
  // these will be set in createNodes and chart functions
  let svg = null;
  let bubbles = null;
  let labels = null;
  let innerText = null;
  let nodes = [];
  const xValue = (d) => d.x;
  const yValue = (d) => d.y;
  const radiusSize = (d) => d.r;

  // helper functions needed to render the graph
  // charge is dependent on size of the bubble, so bigger towards the middle
  function charge(d) {
    return Math.pow(d.radius, 2.0) * 0.01;
  }
  // create a force simulation and add forces to it
  const simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength(charge))
    .force(
      "collision",
      d3.forceCollide().radius((d) => d.radius + 1)
    );
  // force simulation starts up automatically, which we don't want as there aren't any nodes yet
  simulation.stop();

  // function returns the new node array, with a node for each element in the rawData input
  function createNodes(rawData) {
    // use max size in the data as the max in the scale's domain
    // note we have to ensure that size is a number
    const maxSize = d3.max(rawData, (d) => radiusSize(d));

    // size bubbles based on area
    const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 60]);

    // use map() to convert raw data into node data
    const myNodes = rawData.map(function (d, i) {
      return {
        ...d,
        radius: radiusScale(radiusSize(d)),
        size: +d.r,
        x: xScale(xValue(d)),
        y: yScale(yValue(d)),
      };
    });

    return myNodes;
  }

  // append static assets to graph
  // plus icon
  const img = selection
    .append("svg:image")
    .attr("xlink:href", "assets/icon-plus.png")
    .attr("width", 50)
    .attr("height", 50)
    .attr("x", width - 20)
    .attr("y", -35);
  // scales
  const xScale = d3
    .scaleLinear()
    .range([140, width - 120])
    .domain(d3.extent(data.map((d) => d.y)));
  const yScale = d3
    .scaleLinear()
    .range([height - 70, 80])
    .domain(d3.extent(data.map((d) => d.x)));
  // .range([height - 20, 0])
  // .domain([0, 100]);

  // Lines
  // bottom vertical line
  selection
    .append("line")
    .attr("class", "stroke-dark")
    .style("stroke-width", 1)
    .attr("x1", 70)
    .attr("y1", -10)
    .attr("x2", width / 2.6)
    .attr("y2", -10);
  selection
    .append("line")
    .attr("class", "stroke-dark")
    .style("stroke-width", 1)
    .attr("x1", width / 1.6)
    .attr("y1", -10)
    .attr("x2", width - 40)
    .attr("y2", -10);
  selection
    .append("line")
    .attr("class", "stroke-dark")
    .style("stroke-width", 1)
    .attr("x1", width + 5)
    .attr("y1", 20)
    .attr("x2", width + 5)
    .attr("y2", height / 2.7);
  selection
    .append("line")
    .attr("class", "stroke-dark")
    .style("stroke-width", 1)
    .attr("x1", width + 5)
    .attr("y1", height / 1.6)
    .attr("x2", width + 5)
    .attr("y2", height);

  // axis labels
  const xLabel = selection
    .append("text")
    .attr("y", 0)
    .attr("x", width / 2)
    .attr("font-size", "1.5rem")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text(xAxisTitle.toUpperCase());
  const yLabel = selection
    .append("text")
    .attr("transform", "rotate(90)")
    .attr("y", -width + 5)
    .attr("x", height / 2)
    .attr("font-size", "1.5rem")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text(yAxisTitle.toUpperCase());

  // main entry point to bubble chart, returned by parent closure
  // prepares rawData for visualisation and adds an svg element to the provided selector and starts the visualisation process

  function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);
    // create svg element inside provided selector
    svg = selection.append("svg").attr("class", "bubble-chart");
    // bind nodes data to circle elements
    const elements = svg
      .selectAll(".bubble")
      .data(nodes, (d) => d.id)
      .enter()
      .append("g");

    bubbles = elements
      .append("circle")
      .classed("bubble", true)
      .attr("r", (d) => d.radius)
      .attr("fill", "#eff2f1")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    // labels
    labels = elements.append("foreignObject");

    innerText = labels.append("xhtml:div").attr("class", "svg-text");
    // set simulation's nodes to our newly created nodes array
    // simulation starts running automatically once nodes are set
    simulation.nodes(nodes).on("tick", ticked).restart();
  }

  // callback function called after every tick of the force simulation
  // here we do the actual repositioning of the circles based on current x and y value of their bound node data
  // x and y values are modified by the force simulation
  function ticked() {
    bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    //
    labels
      .attr("width", (d) => d.radius * 2 - d.radius * 0.3)
      .attr("font-size", (d) => {
        return d.radius / 3.2;
      })
      .attr("height", (d) => d.radius * 2 - d.radius * 0.3)
      .attr("x", (d) => d.x - (d.radius - d.radius * 0.1))
      .attr("y", (d) => d.y - d.radius + d.radius * 0.1);
    innerText.html((d) => d.label);
  }

  // redner the chart
  chart(selection, data);
};

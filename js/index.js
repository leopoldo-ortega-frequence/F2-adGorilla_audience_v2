// data import
import { createAudienceData, createWebsiteList } from "./data/data.js";
import { websiteArray } from "./data/websites.js";
//DOM
const websiteList = document.querySelector(".website-list ul");

// datasets
const interestsArray = [
  "weather",
  "business & industrial",
  "reference",
  "science",
  "finance",
  "online communities",
  "engineering & technology",
  "computer & electronics",
  "arts & entertainment",
  "books & literature",
  "Autos & vehicles",
  "Education",
  "fitness",
  "gardening",
  "Beauty & Fitness",
];
// charts imports
import { drawGraph } from "./charts/graph.js";
import { drawWebsites } from "./charts/wesbites.js";

//DOM selectors
const parentContainer = document.getElementById("slide-content");

// need to rehall all this

const MARGIN = { left: 50, right: 50, top: 50, bottom: 50 };
const WIDTH = parentContainer.clientWidth;
const HEIGHT = parentContainer.clientHeight;
const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
console.log(innerWidth);
// different approach here, we will create two primary svg elements on the page
const chartSVG = d3
  .select("#audience-chart")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", 420);
const chartG = chartSVG
  .append("g")
  .attr("class", "audience-interest-chart")
  .attr("transform", `translate(${-MARGIN.left},${MARGIN.top})`);

//draw chart here
drawGraph(chartG, {
  data: createAudienceData(interestsArray),
  width: WIDTH,
  height: 400,
  xAxisTitle: "audience interest",
  yAxisTitle: "indutsry",
});

drawWebsites(
  websiteList,
  createWebsiteList(websiteArray, ["bars", "cog", "people"])
);

let svg = d3.select('svg'), 
width= svg.attr("width"), 
height=svg.attr("height"), 
radius = Math.min(width,height)/2; 

let g = svg.append("g").attr("transform", `translate(${width/2},${height/2})`)

let color = d3.scaleOrdinal([
  "#4daf4a",
  "#377eb8",
  "#ff7f00",
  "#984ea3",
  "#e41a1c"
]);

let pie = d3.pie().value( d => (d.percent))
let path = d3.arc().outerRadius(radius - 10).innerRadius(0); 
let label = d3.arc().outerRadius(radius).innerRadius(radius-80); 

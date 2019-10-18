import * as d3 from "d3";

const userInputValue = document.querySelector("#search-user");
// const repoInputValue = document.querySelector("#search-repo");

const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
// const commitContainer = document.querySelector(".main__profile-commits"); 

const clientId = "Iv1.9e39903e84bf3a07";
const clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

const fetchUsers = async (user) => {
  const user_api_call = await fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`);
   
  const userData = await user_api_call.json(); 
  return userData; 
};

const fetchRepos = async owner => {
  const repo_api_call = await fetch(
    `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
  );
  const repo_data = await repo_api_call.json();
  const repoNames = repo_data.map( repo_datum => 
      repo_datum.name
    )
  return repoNames; 


}


const fetchRepoStats = async (owner, repo) => {
  const repo_stats_api_call = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`);

  const repo_stats_data = await repo_stats_api_call.json(); 
  let sum = 0; 
  // console.log(repo_stats_data);
  repo_stats_data.map( repo_stats_datum => 
    sum += repo_stats_datum.total
  )
  return sum; 

}

const  showData = async () => {
  // fetchUsers(userInputValue.value).then(res => {
  //   nameContainer.innerHTML = `Name: <span class="main__profile-value">${res.userData.name}</span>`
  //   unContainer.innerHTML = `Username: <span class="main__profile-value">${res.userData.login}</span>`
  //   reposContainer.innerHTML = `Repos: <span class="main__profile-value">${res.userData.public_repos}</span>`
  //   urlContainer.innerHTML = `Url: <span class="main__profile-value">${res.userData.html_url}</span>`
  // }); 
  const user = await fetchUsers(userInputValue.value); 
  nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`
  unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`
  reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`
  urlContainer.innerHTML = `URL: <span class="main__profile-value">${user.html_url}</span>`


}

const pieData = async () => {

  const repoNames = await fetchRepos(userInputValue.value);
  const repoCommits = await Promise.all(
    repoNames.map(async repoName => {
      const repoStat = await fetchRepoStats(userInputValue.value, repoName);
      //  console.log(repoStat);
      return repoStat;
    })
  );
  // const pieDataLabels = ["name", "commits"]
  let pieArray = []; 
  
  for (let i = 0; i < repoCommits.length; i++) {
    pieArray.push({ name : repoNames[i] , commits :  repoCommits[i] })
  }

  // let jasonPieData = JSON.stringify(pieData);
  // console.log(jasonPieData);
  console.log(pieArray); 
  return pieArray; 
  // const pieJSON = JSON.stringify(pieArray)
}

const pieGenerator = async () => {
  var w = 300, //width
    h = 300, //height
    r = 100, //radius
    color = d3.scale.category20c(); //builtin range of colors

  const data = pieData(); 

  var vis = d3
    .select("body")
    .append("svg:svg") //create the SVG element inside the <body>
    .data([data]) //associate our data with the document
    .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
    .attr("height", h)
    .append("svg:g") //make a group to hold our pie chart
    .attr("transform", "translate(" + r + "," + r + ")"); //move the center of the pie chart from 0, 0 to radius, radius

  var arc = d3.svg
    .arc() //this will create <path> elements for us using arc data
    .outerRadius(r);

  var pie = d3.layout
    .pie() //this will create arc data for us given a list of values
    .value(function(d) {
      return d.value;
    }); //we must tell it out to access the value of each element in our data array

  var arcs = vis
    .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
    .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
    .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
    .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
    .attr("class", "slice"); //allow us to style things in the slices (like text)

  arcs
    .append("svg:path")
    .attr("fill", function(d, i) {
      return color(i);
    }) //set the color for each slice to be chosen from the color function defined above
    .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

  arcs
    .append("svg:text") //add a label to each slice
    .attr("transform", function(d) {
      //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.innerRadius = 0;
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
    })
    .attr("text-anchor", "middle") //center the text on it's origin
    .text(function(d, i) {
      return data[i].label;
    }); //get the label from our original data array
};

searchButton.addEventListener("click", ()=>{
  showData(); 
  // pieData(); 
  pieGenerator();
})




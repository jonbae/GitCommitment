document.addEventListener("DOMContentLoaded", () => {

  const userInputValue = document.querySelector("#search-user");

  const searchButton = document.querySelector(".searchButton");
  const nameContainer = document.querySelector(".main-profile-name");
  const unContainer = document.querySelector(".main-profile-un");
  const reposContainer = document.querySelector(".main-profile-repos");
  const urlContainer = document.querySelector(".main-profile-url");
  const avatarContainer = document.querySelector(".main-profile-avatar"); 

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
    console.log(repo_api_call)
    const repo_data = await repo_api_call.json() || [];
   
    console.log("this is the repo data");
    console.log(repo_data);
    const repoNames = repo_data.map( repo_datum => 
        repo_datum.name
      )
    return repoNames; 


  }


  const fetchRepoStats = async (owner, repo) => {
    const repo_stats_api_call = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`);
    console.log("this is the repo stats api call")
    console.log(repo_stats_api_call)
    const repo_stats_data = await repo_stats_api_call.json(); 
    console.log(repo_stats_data)
    
    let sum = 0; 
    console.log(repo_stats_data);
    repo_stats_data.map( repo_stats_datum => 
      sum += repo_stats_datum.total
    )
    return sum; 

  }

  const  showData = async () => {

    const user = await fetchUsers(userInputValue.value); 
    nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`
    unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`
    reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`
    urlContainer.innerHTML = `URL: <span class="main__profile-value">${user.html_url}</span>`
    avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;
    

  }

  const repoData = async () => {
    const repoNames = await fetchRepos(userInputValue.value);
    const repoCommits = await Promise.all(
      repoNames.map(async repoName => {
        const repoStat = await fetchRepoStats(userInputValue.value, repoName);
        //  console.log(repoStat);
        return repoStat;
      })
    );

    let data = {};
    for (let i = 0; i < repoNames.length; i++) {
      data[repoNames[i]] = repoCommits[i];
    }

    //beginning of pie chart end of fetch requests

    console.log(data);
    return data; 
  };


  const pieGenerator = async data => {
    d3.selectAll("#vis > *").remove();

    let width = 500;
    let height = 500;
    let margin = 40;
    let radius = Math.min(width, height) / 2 - margin;

    var svg = d3
      .select("#vis")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate( ${width / 2},${height / 2})`);

    //  data =  { a: 9, b: 20, c: 30, d: 8, e: 12 };

    var color = d3
      .scaleOrdinal()
      .domain(data)
      .range([
        "#FFF07C",
        "#80FF72",
        "#7EE8FA",
        "#00DBBE",
        "#00E89E",
        "#00FCAC",
        "#d3ac00",
        "#f7e600",
        "#a2e800",
        "#03d300",
        "#00d176"
      ]);

    var pie = d3.pie().value(function(d) {
      console.log(d);
      console.log(d.value);
      return d.value;
    });

    var arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    var data_ready = await pie(d3.entries(data));
    console.log(data_ready);

    // Define the div for the tooltip
    var div = d3
      .select("#vis")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);
    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius - 75)
          .outerRadius(radius)
      )
      .attr("fill", function(d) {
        return color(d.data.key);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseover", function(d) {
        div
          .transition()
          .duration(300)
          .style("opacity", 1);

        div.html(
          `<p><span class="bold">${d.data.key}</span> has <br/> ${d.data.value} commits</p>`
        );
      })
      .on("mousemove", function(d) {
        d3.select("#tooltip")
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function() {
        d3.select("#tooltip").style("opacity", 0);
      });

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("text")
      //  .text(function(d) {
      //    return d.data.key;
      //  })
      .attr("transform", function(d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 17);

    svg
      .transition()
      .duration(500)
      .attr("d", arcGenerator); // redrawing the path with a smooth transition

    // const change = data => {
    //   var pie = d3
    //        .pie()
    //        .value(function(d) {
    //          return d.value;
    //        })
    //        .sort(null)(data);
    //      var width = 360;
    //      var height = 360;
    //      var radius = Math.min(width, height) / 2;
    //      var donutWidth = 75;
    //      path = d3
    //        .select("#donut")
    //        .selectAll("path")
    //        .data(pie); // Compute the new angles
    //      var arc = d3
    //        .arc()
    //        .innerRadius(radius - donutWidth)
    //        .outerRadius(radius);
    //      path
    //        .transition()
    //        .duration(500)
    //        .attr("d", arc); // redrawing the path with a smooth transition
    // }

    //  function change(data) {
    //    var pie = d3
    //      .pie()
    //      .value(function(d) {
    //        return d.value;
    //      })
    //      .sort(null)(data);
    //    var width = 360;
    //    var height = 360;
    //    var radius = Math.min(width, height) / 2;
    //    var donutWidth = 75;
    //    path = d3
    //      .select("#donut")
    //      .selectAll("path")
    //      .data(pie); // Compute the new angles
    //    var arc = d3
    //      .arc()
    //      .innerRadius(radius - donutWidth)
    //      .outerRadius(radius);
    //    path
    //      .transition()
    //      .duration(500)
    //      .attr("d", arc); // redrawing the path with a smooth transition
    //  }
  };


  searchButton.addEventListener("click", ()=>{
    if(userInputValue.value !== ""){
      showData(); 

      pieGenerator(repoData()); 
    }
  })

  userInputValue.addEventListener("keydown", e => {
    if(e.key === "Enter"){
      e.preventDefault(); 
      if (userInputValue.value !== "") {
        showData();
        pieGenerator(repoData());
      }
    }
  })

})

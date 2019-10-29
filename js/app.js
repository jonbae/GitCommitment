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

  const fetchUsers = async user => {
    const user_api_call = await fetch(
      `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`
    );

    const userData = await user_api_call.json();
    return userData;
  };

  const fetchRepos = async owner => {
    const repo_api_call = await fetch(
      `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
    );
    const repo_data = await repo_api_call.json();
    const repoNames = repo_data.map(repo_datum => repo_datum.name);
    return repoNames;
  };

  const fetchRepoStats = async (owner, repo) => {

    const repo_stats_api_call = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
    );

    const repo_stats_data = (await repo_stats_api_call.json()) || [];
 

    return repo_stats_data;
  };

  const showData = async () => {
    const user = await fetchUsers(userInputValue.value);
    nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`;
    unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`;
    reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`;
    urlContainer.innerHTML = `URL: <span class="main__profile-value">${user.html_url}</span>`;
    avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;
  };

  const repoBarGraph = async () => {
    const repoNames = await fetchRepos(userInputValue.value);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const reposWeekCommits = await Promise.all(
      repoNames.map(async repoName => {
        const repoStats = await fetchRepoStats(userInputValue.value, repoName);
        let dayCommitArr = Array(7).fill(0);
        repoStats.map(repoStat => {
          repoStat.days.map((day, i) => (dayCommitArr[i] += day));
        });
        return dayCommitArr;
      })
    );
 
    let sumArr = Array(7).fill(0);
    reposWeekCommits.map(repoDayCommits =>
      repoDayCommits.map((repoDayCommit, i) => (sumArr[i] += repoDayCommit))
    );
 
   
    let barData = [];

    for (let i = 0; i < days.length; i++) {
      barData.push({ day: days[i], commits: sumArr[i] });
    }
    


    var tip = d3
      .select("#bar-vis")
      .append("div")
      .attr("class", "tip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");

    var svg = d3.select("#bar-vis").attr("class", "background-style");
    var margin = { top: 20, right: 20, bottom: 42, left: 40 };

    var width = 500;
    var height = 500;

    // var width = +svg.attr("width") - margin.left - margin.right;
    // var height = +svg.attr("height") - margin.top - margin.bottom;
  
    // const maxy = Math.max(barData.map( barDatum => barDatum.commits)); 
    const maxy = Math.max.apply(Math,barData.map((barDatum) => barDatum.commits ))

    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.05);
    var y = d3
      .scaleBand()
      .rangeRound([height, 0])
      .padding(0.05);

    var g = svg
      .append("g")
      .attr("tranform", `translate(${margin.left}, ${margin.top})`);

    x.domain(
      barData.map(function(d) {
        return d.day;
      })
    );
    y.domain(
      // barData.map(function(d) {
      //   return d.commits;
      // })
      0
    );


    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("y", 6)
      .attr("dy", "2.5em")
      .attr("dx", width / 2 - margin.left)
      .attr("text-anchor", "start")
      .text("Day");

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(20))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "1em")
      .attr("text-anchor", "end")
      .text("Commits");

    g.selectAll(".bar")
      .data(barData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("transform", `scale(1,-1)translate(0,-${height})`)
      .attr("x", function(d) {

        return x(d.day);
      })
      .attr("y", function(d) {

        return y(d.commits);
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
  
        return  ((d.commits/maxy) * height);
        // return height- d3.yScale(d.commits);
      })
      .on("mouseover", function(d) {
        console.log(d)
        return tip
          .text(d.commits)
          .style("visibility", "visible")
          .style("top", y(d.commits) - 13 + "px")
          .style("left", x(d.days) + x.bandwidth() - 12 + "px");
      })
      //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function() {
        console.log("out")
        return tip.style("visibility", "hidden");
      });
  };


  // const repoPieChart = async () => {
  //   const repoNames = await fetchRepos(userInputValue.value);
  //   const repoCommits = await Promise.all(
  //     repoNames.map(async repoName => {
  //       const repoStats = await fetchRepoStats(
  //         userInputValue.value,
  //         repoName
  //       );
  //       let sum = 0;
  //       repoStats.map(repoStat => (sum += repoStat.total));
  //       return sum;
  //     })
  //   );

  //   let pieData = [];
  //   for (let i = 0; i < repoNames.length; i++) {
  //     pieData.push({ repo: repoNames[i], commits: repoCommits[i] });
  //   }

  //   //beginning of pie chart end of fetch requests

  //   console.log("repo data");
  //   console.log(pieData);

  //   var width = 500;
  //   var height = 500;
  //   var innerRadius = 0;
  //   var outerRadius = Math.min(width, height) / 2 ;

  //   var color = d3.scaleOrdinal();

  //   var pie = d3.pie()
  //     .value( function(d) {
  //       console.log(d)
  //       return d.commits;
  //     })

  //   var svg = d3.select('#pie-vis')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', `translate(${width/2},${height/2})`)

  //   var arc = d3.arc()
  //     .innerRadius(0)
  //     .outerRadius(outerRadius)

  //   var path = svg.datum(pieData).selectAll('path')
  //     .data(pie)
  //     .enter().append('path')
  //     .attr('fill', (d,i) => { return color(i); })
  //     .attr('d', arc)
  //     // set wedge opacity to 0 if it has mass on load (only the last wedge has mass to account for transition in
  //     // .style('opacity', function (d) { return d.data[0] === 0 ? 1 : 0; })
  //     // .each(function (d) { this._current = d; })

  //   // pie.value( d => d[0])
  //   // path = path.data(pie);
  //   // path.transition()
  //   //   .duration(1000).attrTween('d', arcTween);

  //   // function arcTween(a) {
  //   //   var i =  d3.interpolate(this._current, a);
  //   //   this._current = i(0);
  //   //   return function(t) {
  //   //     return arc(i(t));
  //   //   };
  //   // }
  // };


  searchButton.addEventListener("click", () => {
    if (userInputValue.value != "") {
      showData();
      repoBarGraph();
      repoPieChart();
    }
  });

  userInputValue.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInputValue.value !== "") {
        showData();
        repoBarGraph();
        repoPieChart();
      }
    }
  });
});















































// document.addEventListener("DOMContentLoaded", () => {

//   const userInputValue = document.querySelector("#search-user");

//   const searchButton = document.querySelector(".searchButton");
//   const nameContainer = document.querySelector(".main-profile-name");
//   const unContainer = document.querySelector(".main-profile-un");
//   const reposContainer = document.querySelector(".main-profile-repos");
//   const urlContainer = document.querySelector(".main-profile-url");
//   const avatarContainer = document.querySelector(".main-profile-avatar");

//   const clientId = "Iv1.9e39903e84bf3a07";
//   const clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

//   const fetchUsers = async (user) => {
//     const user_api_call = await fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`);
    
//     const userData = await user_api_call.json(); 
//     return userData; 
//   };

//   const fetchRepos = async owner => {
//     const repo_api_call = await fetch(
//       `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
//     );
//     const repo_data = await repo_api_call.json();
//     const repoNames = repo_data.map( repo_datum => 
//         repo_datum.name
//       )
//     return repoNames; 


//   }


//   const fetchRepoStats = async (owner, repo) => {
//     console.log(repo);
//     const repo_stats_api_call = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`);
//     console.log(repo_stats_api_call)
//     const repo_stats_data = await repo_stats_api_call.json() || []; 
//     console.log(repo_stats_data)
    
//     return repo_stats_data; 
    
//     // if(type === "pie"){
//     //   let sum = 0; 
//     //   // console.log(repo_stats_data);
//     //   repo_stats_data.map( repo_stats_datum => 
//     //     sum += repo_stats_datum.total
//     //   )
//     //   return sum; 
//     // } else if(type === "bar"){
//     //   let sumArr = Array(7).fill(0); 
//     //   repo_stats_data.map( repo_stats_datum => {
//     //     repo_stats_datum.days.map( (day,i) =>{
//     //       console.log("this is i" + i);
//     //       console.log("this is day" + day); 
//     //       sumArr[i] += day
//     //     })
//     //   }

//     //   )
//     // }
//   }

//   const  showData = async () => {

//     const user = await fetchUsers(userInputValue.value); 
//     nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`
//     unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`
//     reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`
//     urlContainer.innerHTML = `URL: <span class="main__profile-value">${user.html_url}</span>`
//     avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;

//   }

//   const repoBarData = async () => {
//     const repoNames = await fetchRepos(userInputValue.value); 
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const reposWeekCommits = await Promise.all( 
//       repoNames.map( async repoName => {
//         const repoStats = await fetchRepoStats(userInputValue.value, repoName); 
//         let dayCommitArr = Array(7).fill(0); 
//         repoStats.map( repoStat => {
//           repoStat.days.map( (day,i) => dayCommitArr[i] += day )
//         })
//         return dayCommitArr; 

//       })
//     )
//     console.log(reposWeekCommits);
//     let sumArr = Array(7).fill(0); 
//     reposWeekCommits.map( (repoDayCommits) => 
//       repoDayCommits.map( (repoDayCommit,i) => sumArr[i] += repoDayCommit  )
//     )
//     console.log(sumArr); 

//     let barData = []; 

//     for(let i = 0; i<days.length; i++){
//       barData.push( {day: days[i], commits: sumArr[i]})
//     }

//     console.log(barData); 
//     return barData;

//     // console.log(repoCommits)
    

//     // let barData = []; 
//     // for(let i = 0; i< repoNames.length; i++) {
//     //   barData.push( {repo: repoNames[i], dayCommits: repoCommits[i]})
//     // }
//     // console.log(barData)
//     // return barData;
//   }


//   const repoPieData = async () => {

//     const repoNames = await fetchRepos(userInputValue.value);
//     const repoCommits = await Promise.all(
//       repoNames.map(async repoName => {
//         const repoStats = await fetchRepoStats(userInputValue.value, repoName);
//         let sum = 0; 
//         repoStats.map( repoStat => 
//           sum += repoStat.total
//         )
//         return sum;
//       })
//     );

//     let pieData = [];
//     for (let i = 0; i < repoNames.length; i++) {
//       pieData.push( {repo: repoNames[i], commits: repoCommits[i]} );      
//     }

//     //beginning of pie chart end of fetch requests 

//     console.log("repo data")
//     console.log(pieData)
//     return pieData; 
//   };

//   // const update = data => {
//   //   var update = svg.select("#vis").data(data)
//   //   var enter = update.enter().append('svg'); 
//   //   var exit = update.exit().remove(); 
//   //   update.merge(enter); 
//   // }

//   const barGenerator = data => { 
//     console.log(data);

//     var tip = d3
//       .select("#bar-vis")
//       .append("div")
//       .attr("class", "tip")
//       .style("position", "absolute")
//       .style("z-index", "10")
//       .style("visibility", "hidden");

//     var svg = d3.select("#bar-vis").attr("class", "background-style")
//     var margin = {top: 20, right: 20, bottom: 42, left: 40}

//     var width = 500; 
//     var height = 500;

//     // var width = +svg.attr("width") - margin.left - margin.right;
//     // var height = +svg.attr("height") - margin.top - margin.bottom;
//     console.log(height)

//     var x = d3.scaleBand().rangeRound([0,width]).padding(0.05)
//     var y = d3.scaleBand().rangeRound([height,0]).padding(0.05)

//     var g = svg.append("g")
//       .attr("tranform", `translate(${margin.left}, ${margin.top})`); 

//     x.domain(data.map(function(d){ return d.day; }));
//     y.domain(data.map(function(d){ return d.commits}));
      

    
//     g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x))
//       .append("text")
//       .attr("y", 6)
//       .attr("dy", "2.5em")
//       .attr("dx", width/2 - margin.left)
//       .attr("text-anchor", "start")
//       .text("Day");

//     g.append("g")
//       .attr("class","axis axis--y")
//       .call(d3.axisLeft(y).ticks(20))
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6) 
//       .attr("dy", "1em")
//       .attr("text-anchor", "end")
//       .text("Commits");
      
//     g.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return x(d.day); })
//         .attr("y", function(d) { return y(d.commits); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { 
//           return height - y(d.commits)
//         })
//         .on("mouseover", function(d) {return tip.text(d.commits).style("visibility", "visible").style("top", y(d.commits) - 13+ 'px' ).style("left", x(d.grad_year) + x.bandwidth() - 12 + 'px')})
//         //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//         .on("mouseout", function(){return tip.style("visibility", "hidden");});

//   }



//   const pieGenerator = async data => {
//     console.log(data)
//     // data = [{repo: "dummy1", commits: 66}, {repo:"dummy2", commits: 93}];

//     var width = 500; 
//     var height = 500; 
//     var innerRadius = 0; 
//     var outerRadius = Math.min(width, height) / 2 ; 

//     var color = d3.scaleOrdinal(); 

//     var pie = d3.pie()
//       .value( function(d) {
//         console.log(d)
//         return d.commits;
//       }) 

    
//     var svg = d3.select('#pie-vis')
//       .attr('width', width)
//       .attr('height', height) 
//       .append('g')
//       .attr('transform', `translate(${width/2},${height/2})`)

    
//     var arc = d3.arc()
//       .innerRadius(0)
//       .outerRadius(outerRadius) 


//     var path = svg.datum(data).selectAll('path')
//       .data(pie)
//       .enter().append('path')
//       .attr('fill', (d,i) => { return color(i); })
//       .attr('d', arc)
//       // set wedge opacity to 0 if it has mass on load (only the last wedge has mass to account for transition in
//       // .style('opacity', function (d) { return d.data[0] === 0 ? 1 : 0; })
//       // .each(function (d) { this._current = d; })


//     pie.value( d => d[0])
//     path = path.data(pie); 
//     path.transition()
//       .duration(1000).attrTween('d', arcTween); 

//    async function arcTween(a) {
//      var i =  d3.interpolate(this._current, a);
//      this._current = await i(0);
//      return function(t) {
//        return arc(i(t));
//      };
//    }
//   }
  

//   searchButton.addEventListener("click", async ()=>{
//     if(userInputValue.value !== ""){
//       showData();
//       const pieData = await repoPieData();
//       const barData = await repoBarData();
//       pieGenerator(pieData);
//       barGenerator(barData);
//     }
//   })

//   userInputValue.addEventListener("keydown", async e => {
//     if(e.key === "Enter"){
//       e.preventDefault(); 
//       if (userInputValue.value !== "") {
//         showData();
//         const pieData = await repoPieData();
//         const barData = await repoBarData(); 
//         pieGenerator(pieData);
//         barGenerator(barData);
  
//       }
//     }
//   })

// })

// // const jonbaeData = {
// //   user: {
// //     name: "Jonathan Bae",
// //     login: "jonbae",
// //     public_repos: 8,
// //     avatar_url: "https://avatars1.githubusercontent.com/u/11264502?v=4",
// //     bio:
// //       "Fullstack Engineer with a passion for Ruby on Rails, React, and JavaScript",
// //     location: "New York, New York"
// //   },
// //   barData: [
// //     { day: "Sunday", commits: 3 },
// //     { day: "Monday", commits: 15 },
// //     { day: "Tuesday", commits: 20 },
// //     { day: "Wednesday", commits: 14 },
// //     { day: "Thursday", commits: 24 },
// //     { day: "Friday", commits: 25 },
// //     { day: "Saturday", commits: 6 }
// //   ],
// //   pieData: [
// //     { repo: "App_Academy", commits: 3 },
// //     { repo: "code_snippets", commits: 16 },
// //     { repo: "flask-blog", commits: 1 },
// //     { repo: "jonbae.github.io", commits: 1 },
// //     { repo: "projects-2017", commits: 0 },
// //     { repo: "SheikahNote", commits: 63 }
// //   ]
// // };

// document.addEventListener("DOMContentLoaded", () => {
//     const userInputValue = document.querySelector("#search-user");

//     const searchButton = document.querySelector(".searchButton");
//     const nameContainer = document.querySelector(".main-profile-name");
//     const unContainer = document.querySelector(".main-profile-un");
//     const reposContainer = document.querySelector(".main-profile-repos");
//     const urlContainer = document.querySelector(".main-profile-url");
//     const avatarContainer = document.querySelector(".main-profile-avatar");
//     const bioContainer = document.querySelector(".main-profile-bio");
//     const locationContainer = document.querySelector(".main-profile-location");

//     const clientId = "Iv1.9e39903e84bf3a07";
//     const clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

//     const fetchUsers = async user => {
//         const user_api_call = await fetch(
//             `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`
//         );

//         const userData = await user_api_call.json();
//         return userData;
//     };

//     const fetchRepos = async owner => {
//         const repo_api_call = await fetch(
//             `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
//         );
//         debugger;
//         const repo_data = await repo_api_call.json();
//         debugger;
//         const repoNames = repo_data.map(repo_datum => repo_datum.name);
//         return repoNames;
//     };

//     const fetchRepoStats = async (owner, repo) => {
//         const repo_stats_api_call = await fetch(
//             `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
//         );
//         const repo_stats_data = await repo_stats_api_call.clone().json();
//         debugger;

//         return repo_stats_data;
//     };

//     const showData = async () => {
//         // const user =
//         //     jonbaeData.user.login === userInputValue.value
//         //         ? jonbaeData.user
//         //         : await fetchUsers(userInputValue.value);
//         const user = await fetchUsers(userInputValue.value);
//         nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`;
//         unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`;
//         reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`;
//         avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;
//         bioContainer.innerHTML = `Bio: <span class="main__profile-value">${user.bio}</span>`;
//         locationContainer.innerHTML = `Location: <span class="main__profile-value">${user.location}</span>`;
//     };

//     const repoBarGraph = async () => {
//         d3.selectAll("#bar-vis > *").remove();
//         d3.select(".main-vis-container > #tip").remove();

//         const days = [
//             "Sunday",
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday"
//         ];
//         let barData = [];
//         // if (jonbaeData.user.login === userInputValue.value) {
//         //     barData = jonbaeData.barData;
//         // } else {
//         const repoNames = await fetchRepos(userInputValue.value);

//         const reposWeekCommits = await Promise.all(
//             repoNames.map(async repoName => {
//                 const repoStats = await fetchRepoStats(
//                     userInputValue.value,
//                     repoName
//                 );
//                 let dayCommitArr = Array(7).fill(0);
//                 repoStats.map(repoStat => {
//                     repoStat.days.map((day, i) => (dayCommitArr[i] += day));
//                 });
//                 debugger;
//                 return dayCommitArr;
//             })
//         );

//         let sumArr = Array(7).fill(0);
//         reposWeekCommits.map(repoDayCommits =>
//             repoDayCommits.map(
//                 (repoDayCommit, i) => (sumArr[i] += repoDayCommit)
//             )
//         );

//         for (let i = 0; i < days.length; i++) {
//             barData.push({ day: days[i], commits: sumArr[i] });
//         }
//         // }
//         console.log("this is barData");
//         console.log(barData);
//         debugger;

//         const tip = d3
//             .select(".main-vis-container")
//             .append("div")
//             .attr("id", "tip")
//             .style("opacity", 0);

//         // var tip = d3
//         //   .select(".main-vis-container")
//         //   .append("div")
//         //   .attr("class", "tip")
//         //   .style("position", "absolute")
//         //   .style("z-index", "10")
//         //   .style("visibility", "hidden");

//         var svg = d3.select("#bar-vis").attr("class", "background-style");
//         var margin = { top: 20, right: 20, bottom: 42, left: 40 };

//         var width = 500;
//         var height = 500;

//         // var width = +svg.attr("width") - margin.left - margin.right;
//         // var height = +svg.attr("height") - margin.top - margin.bottom;

//         // const maxy = Math.max(barData.map( barDatum => barDatum.commits));
//         const maxy = Math.max.apply(
//             Math,
//             barData.map(barDatum => barDatum.commits)
//         );

//         var x = d3.scaleBand().rangeRound([0, width]).padding(0.05);
//         var y = d3.scaleBand().rangeRound([height, 0]).padding(0.05);
//         debugger;

//         var g = svg
//             .append("g")
//             .attr("transform", `translate(${margin.left}, ${margin.top})`);

//         x.domain(
//             barData.map(function(d) {
//                 return d.day;
//             })
//         );
//         y.domain(
//             // barData.map(function(d) {
//             //   return d.commits;
//             // })
//             0
//         );

//         g
//             .append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", `translate(0,${height})`)
//             .call(d3.axisBottom(x))
//             .append("text")
//             .attr("y", 6)
//             .attr("dy", "2.5em")
//             .attr("dx", width / 2 - margin.left)
//             .attr("text-anchor", "start")
//             .text("Day");

//         g
//             .append("g")
//             .attr("class", "axis axis--y")
//             .call(d3.axisLeft(y).ticks(20))
//             .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", "1em")
//             .attr("text-anchor", "end")
//             .text("Commits");

//         g
//             .selectAll(".bar")
//             .data(barData)
//             .enter()
//             .append("rect")
//             .attr("class", "bar")
//             .attr("transform", `scale(1,-1)translate(0,-${height})`)
//             .attr("x", function(d) {
//                 return x(d.day);
//             })
//             .attr("y", function(d) {
//                 return y(d.commits);
//             })
//             .attr("width", x.bandwidth())
//             .attr("height", function(d) {
//                 return d.commits / maxy * height;
//                 // return height- d3.yScale(d.commits);
//             })
//             .attr("fill", "#03d300")
//             .on("mouseover", function(d, i) {
//                 //Where I'm having problems - getting the X attribute!
//                 // console.log(d);
//                 tip.html(`${d.commits} commits `);
//                 var barPos = parseFloat(
//                     d3.select(this.parentNode).attr("transform").split("(")[1]
//                 );

//                 var xPosition = barPos + x(d.day) + 47;
//                 var yPosition =
//                     -parseFloat(d3.select(this).attr("height")) + 860;
//                 debugger;
//                 console.log(yPosition);
//                 //Update the tooltip position and value
//                 d3
//                     .select("#tip")
//                     .style("left", xPosition + "px")
//                     .style("top", yPosition + "px");

//                 //Show the tooltip
//                 d3.select("#tip").style("opacity", 1);
//             })
//             // .on("mousemove", function(d) {

//             // })
//             .on("mouseout", function() {
//                 d3.select("#tip").style("opacity", 0);
//             });
//     };

//     const repoPieChart = async () => {
//         d3.selectAll("#pie-vis > *").remove();
//         d3.select(".main-vis-container > div#tooltip").remove();

//         const repoNames = await fetchRepos(userInputValue.value);
//         const repoCommits = await Promise.all(
//             repoNames.map(async repoName => {
//                 const repoStats = await fetchRepoStats(
//                     userInputValue.value,
//                     repoName
//                 );
//                 let sum = 0;
//                 console.log(repoStats);
//                 repoStats.map(repoStat => (sum += repoStat.total));
//                 return sum;
//             })
//         );

//         let pieData = [];
//         for (let i = 0; i < repoNames.length; i++) {
//             pieData.push({ repo: repoNames[i], commits: repoCommits[i] });
//         }
//         console.log("this is pieData");
//         console.log(pieData);

//         //beginning of pie chart end of fetch requests

//         var width = 500;
//         var height = 500;
//         var innerRadius = 0;
//         var outerRadius = Math.min(width, height) / 2;

//         var color = d3
//             .scaleOrdinal()
//             .domain(pieData)
//             .range([
//                 "#d4c685",
//                 "#f7ef81",
//                 "#cfe795",
//                 "#a7d3a6",
//                 "#add2c2",
//                 "#d3ac00",
//                 "#f7e600",
//                 "#a2e800",
//                 "#03d300",
//                 "#00d176"
//             ]);
//         var pie = d3.pie().value(function(d) {
//             return d.commits;
//         });

//         var data_ready = await pie(d3.entries(pieData));
//         console.log(data_ready);

//         var div = d3
//             .select(".main-vis-container")
//             .append("div")
//             .attr("id", "tooltip")
//             .style("opacity", 0);

//         var svg = d3
//             .select("#pie-vis")
//             .attr("width", width)
//             .attr("height", height)
//             .append("g")
//             .attr("transform", `translate(${width / 2},${height / 2})`);

//         var arc = d3.arc().innerRadius(0).outerRadius(outerRadius);

//         var path = svg
//             .datum(pieData)
//             .selectAll("path")
//             .data(pie)
//             .enter()
//             .append("path")
//             .attr("fill", (d, i) => {
//                 return color(i);
//             })
//             .attr("d", arc)
//             .on("mouseover", function(d) {
//                 console.log(data_ready);
//                 console.log(d);
//                 div.style("opacity", 1);

//                 div.html(`${d.data.repo} has <br/> ${d.data.commits} commits`);
//             })
//             .on("mousemove", function(d) {
//                 d3
//                     .select("#tooltip")
//                     .style("top", d3.event.pageY - 10 + "px")
//                     .style("left", d3.event.pageX + 10 + "px");
//             })
//             .on("mouseout", function() {
//                 d3.select("#tooltip").style("opacity", 0);
//             })
//             .each(function() {
//                 this._current = {
//                     startAngle: 0,
//                     endAngle: 0
//                 };
//             })
//             .transition()
//             .duration(1000)
//             .attrTween("d", function(d) {
//                 var interpolate = d3.interpolate(this._current, d);
//                 this._current = interpolate(0);

//                 return function(t) {
//                     return arc(interpolate(t));
//                 };
//             });

//         // pie.value( d => d[0])
//         // path = path.data(pie);
//         // path.transition()
//         //   .duration(1000).attrTween('d', arcTween);

//         // function arcTween(a) {
//         //   var i =  d3.interpolate(this._current, a);
//         //   this._current = i(0);
//         //   return function(t) {
//         //     return arc(i(t));
//         //   };
//         // }

//         // set wedge opacity to 0 if it has mass on load (only the last wedge has mass to account for transition in
//         // .style('opacity', function (d) { return d.data[0] === 0 ? 1 : 0; })
//         // .each(function (d) { this._current = d; })

//         // svg
//         //   .selectAll("whatever")
//         //   .data(data_ready)
//         //   .enter()
//         //   .append("path")
//         //   .attr(
//         //     "d",
//         //     d3
//         //       .arc()
//         //       .innerRadius(0)
//         //       .outerRadius(outerRadius)
//         //   )
//         //   .attr("fill", function(d) {
//         //     console.log(d.data.key);
//         //     return color(d.data.key);
//         //   })
//         //   .attr("stroke", "black")
//         //   .style("stroke-width", "2px")
//         //   .style("opacity", 0.7)
//         //   .on("mouseover", function(d) {
//         //     console.log(d.data.key);
//         //     div
//         //       .transition()
//         //       .duration(300)
//         //       .style("opacity", 1);

//         //     div.html(d.data.key + "<br/>" + d.data.value);
//         //   })
//         //   .on("mousemove", function(d) {
//         //     d3.select("#tooltip")
//         //       .style("top", d3.event.pageY - 10 + "px")
//         //       .style("left", d3.event.pageX + 10 + "px");
//         //   })
//         //   .on("mouseout", function() {
//         //     d3.select("#tooltip").style("opacity", 0);
//         //   });

//         // pie.value( d => d[0])
//         // path = path.data(pie);
//         // path.transition()
//         //   .duration(1000).attrTween('d', arcTween);

//         // function arcTween(a) {
//         //   var i =  d3.interpolate(this._current, a);
//         //   this._current = i(0);
//         //   return function(t) {
//         //     return arc(i(t));
//         //   };
//         // }
//     };

//     searchButton.addEventListener("click", () => {
//         if (userInputValue.value != "") {
//             showData();
//             repoBarGraph();
//             repoPieChart();
//         }
//     });

//     userInputValue.addEventListener("keydown", e => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             if (userInputValue.value !== "") {
//                 showData();
//                 repoBarGraph();
//                 repoPieChart();
//             }
//         }
//     });
// });

// // document.addEventListener("DOMContentLoaded", () => {

// //   const userInputValue = document.querySelector("#search-user");

// //   const searchButton = document.querySelector(".searchButton");
// //   const nameContainer = document.querySelector(".main-profile-name");
// //   const unContainer = document.querySelector(".main-profile-un");
// //   const reposContainer = document.querySelector(".main-profile-repos");
// //   const urlContainer = document.querySelector(".main-profile-url");
// //   const avatarContainer = document.querySelector(".main-profile-avatar");

// //   const clientId = "Iv1.9e39903e84bf3a07";
// //   const clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

// //   const fetchUsers = async (user) => {
// //     const user_api_call = await fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`);

// //     const userData = await user_api_call.json();
// //     return userData;
// //   };

// //   const fetchRepos = async owner => {
// //     const repo_api_call = await fetch(
// //       `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
// //     );
// //     const repo_data = await repo_api_call.json();
// //     const repoNames = repo_data.map( repo_datum =>
// //         repo_datum.name
// //       )
// //     return repoNames;

// //   }

// //   const fetchRepoStats = async (owner, repo) => {
// //     console.log(repo);
// //     const repo_stats_api_call = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`);
// //     console.log(repo_stats_api_call)
// //     const repo_stats_data = await repo_stats_api_call.json() || [];
// //     console.log(repo_stats_data)

// //     return repo_stats_data;

// //     // if(type === "pie"){
// //     //   let sum = 0;
// //     //   // console.log(repo_stats_data);
// //     //   repo_stats_data.map( repo_stats_datum =>
// //     //     sum += repo_stats_datum.total
// //     //   )
// //     //   return sum;
// //     // } else if(type === "bar"){
// //     //   let sumArr = Array(7).fill(0);
// //     //   repo_stats_data.map( repo_stats_datum => {
// //     //     repo_stats_datum.days.map( (day,i) =>{
// //     //       console.log("this is i" + i);
// //     //       console.log("this is day" + day);
// //     //       sumArr[i] += day
// //     //     })
// //     //   }

// //     //   )
// //     // }
// //   }

// //   const  showData = async () => {

// //     const user = await fetchUsers(userInputValue.value);
// //     nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`
// //     unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`
// //     reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`
// //     urlContainer.innerHTML = `URL: <span class="main__profile-value">${user.html_url}</span>`
// //     avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;

// //   }

// //   const repoBarData = async () => {
// //     const repoNames = await fetchRepos(userInputValue.value);
// //     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// //     const reposWeekCommits = await Promise.all(
// //       repoNames.map( async repoName => {
// //         const repoStats = await fetchRepoStats(userInputValue.value, repoName);
// //         let dayCommitArr = Array(7).fill(0);
// //         repoStats.map( repoStat => {
// //           repoStat.days.map( (day,i) => dayCommitArr[i] += day )
// //         })
// //         return dayCommitArr;

// //       })
// //     )
// //     console.log(reposWeekCommits);
// //     let sumArr = Array(7).fill(0);
// //     reposWeekCommits.map( (repoDayCommits) =>
// //       repoDayCommits.map( (repoDayCommit,i) => sumArr[i] += repoDayCommit  )
// //     )
// //     console.log(sumArr);

// //     let barData = [];

// //     for(let i = 0; i<days.length; i++){
// //       barData.push( {day: days[i], commits: sumArr[i]})
// //     }

// //     console.log(barData);
// //     return barData;

// //     // console.log(repoCommits)

// //     // let barData = [];
// //     // for(let i = 0; i< repoNames.length; i++) {
// //     //   barData.push( {repo: repoNames[i], dayCommits: repoCommits[i]})
// //     // }
// //     // console.log(barData)
// //     // return barData;
// //   }

// //   const repoPieData = async () => {

// //     const repoNames = await fetchRepos(userInputValue.value);
// //     const repoCommits = await Promise.all(
// //       repoNames.map(async repoName => {
// //         const repoStats = await fetchRepoStats(userInputValue.value, repoName);
// //         let sum = 0;
// //         repoStats.map( repoStat =>
// //           sum += repoStat.total
// //         )
// //         return sum;
// //       })
// //     );

// //     let pieData = [];
// //     for (let i = 0; i < repoNames.length; i++) {
// //       pieData.push( {repo: repoNames[i], commits: repoCommits[i]} );
// //     }

// //     //beginning of pie chart end of fetch requests

// //     console.log("repo data")
// //     console.log(pieData)
// //     return pieData;
// //   };

// //   // const update = data => {
// //   //   var update = svg.select("#vis").data(data)
// //   //   var enter = update.enter().append('svg');
// //   //   var exit = update.exit().remove();
// //   //   update.merge(enter);
// //   // }

// //   const barGenerator = data => {
// //     console.log(data);

// //     var tip = d3
// //       .select("#bar-vis")
// //       .append("div")
// //       .attr("class", "tip")
// //       .style("position", "absolute")
// //       .style("z-index", "10")
// //       .style("visibility", "hidden");

// //     var svg = d3.select("#bar-vis").attr("class", "background-style")
// //     var margin = {top: 20, right: 20, bottom: 42, left: 40}

// //     var width = 500;
// //     var height = 500;

// //     // var width = +svg.attr("width") - margin.left - margin.right;
// //     // var height = +svg.attr("height") - margin.top - margin.bottom;
// //     console.log(height)

// //     var x = d3.scaleBand().rangeRound([0,width]).padding(0.05)
// //     var y = d3.scaleBand().rangeRound([height,0]).padding(0.05)

// //     var g = svg.append("g")
// //       .attr("tranform", `translate(${margin.left}, ${margin.top})`);

// //     x.domain(data.map(function(d){ return d.day; }));
// //     y.domain(data.map(function(d){ return d.commits}));

// //     g.append("g")
// //       .attr("class", "axis axis--x")
// //       .attr("transform", `translate(0,${height})`)
// //       .call(d3.axisBottom(x))
// //       .append("text")
// //       .attr("y", 6)
// //       .attr("dy", "2.5em")
// //       .attr("dx", width/2 - margin.left)
// //       .attr("text-anchor", "start")
// //       .text("Day");

// //     g.append("g")
// //       .attr("class","axis axis--y")
// //       .call(d3.axisLeft(y).ticks(20))
// //       .append("text")
// //       .attr("transform", "rotate(-90)")
// //       .attr("y", 6)
// //       .attr("dy", "1em")
// //       .attr("text-anchor", "end")
// //       .text("Commits");

// //     g.selectAll(".bar")
// //       .data(data)
// //       .enter().append("rect")
// //         .attr("class", "bar")
// //         .attr("x", function(d) { return x(d.day); })
// //         .attr("y", function(d) { return y(d.commits); })
// //         .attr("width", x.bandwidth())
// //         .attr("height", function(d) {
// //           return height - y(d.commits)
// //         })
// //         .on("mouseover", function(d) {return tip.text(d.commits).style("visibility", "visible").style("top", y(d.commits) - 13+ 'px' ).style("left", x(d.grad_year) + x.bandwidth() - 12 + 'px')})
// //         //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
// //         .on("mouseout", function(){return tip.style("visibility", "hidden");});

// //   }

// //   const pieGenerator = async data => {
// //     console.log(data)
// //     // data = [{repo: "dummy1", commits: 66}, {repo:"dummy2", commits: 93}];

// //     var width = 500;
// //     var height = 500;
// //     var innerRadius = 0;
// //     var outerRadius = Math.min(width, height) / 2 ;

// //     var color = d3.scaleOrdinal();

// //     var pie = d3.pie()
// //       .value( function(d) {
// //         console.log(d)
// //         return d.commits;
// //       })

// //     var svg = d3.select('#pie-vis')
// //       .attr('width', width)
// //       .attr('height', height)
// //       .append('g')
// //       .attr('transform', `translate(${width/2},${height/2})`)

// //     var arc = d3.arc()
// //       .innerRadius(0)
// //       .outerRadius(outerRadius)

// //     var path = svg.datum(data).selectAll('path')
// //       .data(pie)
// //       .enter().append('path')
// //       .attr('fill', (d,i) => { return color(i); })
// //       .attr('d', arc)
// //       // set wedge opacity to 0 if it has mass on load (only the last wedge has mass to account for transition in
// //       // .style('opacity', function (d) { return d.data[0] === 0 ? 1 : 0; })
// //       // .each(function (d) { this._current = d; })

// //     pie.value( d => d[0])
// //     path = path.data(pie);
// //     path.transition()
// //       .duration(1000).attrTween('d', arcTween);

// //    async function arcTween(a) {
// //      var i =  d3.interpolate(this._current, a);
// //      this._current = await i(0);
// //      return function(t) {
// //        return arc(i(t));
// //      };
// //    }
// //   }

// //   searchButton.addEventListener("click", async ()=>{
// //     if(userInputValue.value !== ""){
// //       showData();
// //       const pieData = await repoPieData();
// //       const barData = await repoBarData();
// //       pieGenerator(pieData);
// //       barGenerator(barData);
// //     }
// //   })

// //   userInputValue.addEventListener("keydown", async e => {
// //     if(e.key === "Enter"){
// //       e.preventDefault();
// //       if (userInputValue.value !== "") {
// //         showData();
// //         const pieData = await repoPieData();
// //         const barData = await repoBarData();
// //         pieGenerator(pieData);
// //         barGenerator(barData);

// //       }
// //     }
// //   })

// // })

// document.addEventListener("DOMContentLoaded", () => {
//   const userInputValue = document.querySelector("#search-user");

//   const searchButton = document.querySelector(".searchButton");
//   const nameContainer = document.querySelector(".main-profile-name");
//   const unContainer = document.querySelector(".main-profile-un");
//   const reposContainer = document.querySelector(".main-profile-repos");
//   const urlContainer = document.querySelector(".main-profile-url");
//   const avatarContainer = document.querySelector(".main-profile-avatar");
//   const bioContainer = document.querySelector(".main-profile-bio");
//   const locationContainer = document.querySelector(".main-profile-location")

//   const clientId = "Iv1.9e39903e84bf3a07";
//   const clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

//   const fetchUsers = async user => {
//     const user_api_call = await fetch(
//       `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`
//     );

//     const userData = await user_api_call.json();
//     return userData;
//   };

//   const fetchRepos = async owner => {
//     const repo_api_call = await fetch(
//       `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
//     );

//     const repo_data = await repo_api_call.json();
//     const repoNames = repo_data.map(repo_datum => repo_datum.name);
//     return repoNames;
//   };

//   const fetchRepoStats = async (owner, repo) => {

//     const repo_stats_api_call = await fetch(
//       `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
//     );
//       debugger
//     const repo_stats_data = await repo_stats_api_call.json();
//       debugger

//     return repo_stats_data;
//   };

//   const showData = async () => {
//     const user = await fetchUsers(userInputValue.value);
//     nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`;
//     unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`;
//     reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`;
//     avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;
//     bioContainer.innerHTML = `Bio: <span class="main__profile-value">${user.bio}</span>`;
//     locationContainer.innerHTML = `Location: <span class="main__profile-value">${user.location}</span>`;
//   };

//   const repoBarGraph = async () => {
//     d3.selectAll("#bar-vis > *").remove();
//     d3.select(".main-vis-container > #tip").remove();

//     const repoNames = await fetchRepos(userInputValue.value);
//     const days = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday"
//     ];
//     const reposWeekCommits = await Promise.all(
//       repoNames.map(async repoName => {
//         const repoStats = await fetchRepoStats(userInputValue.value, repoName);
//         let dayCommitArr = Array(7).fill(0);
//         repoStats.map(repoStat => {
//           repoStat.days.map((day, i) => (dayCommitArr[i] += day));
//         });
//         return dayCommitArr;
//       })
//     );

//     let sumArr = Array(7).fill(0);
//     reposWeekCommits.map(repoDayCommits =>
//       repoDayCommits.map((repoDayCommit, i) => (sumArr[i] += repoDayCommit))
//     );

//     let barData = [];

//     for (let i = 0; i < days.length; i++) {
//       barData.push({ day: days[i], commits: sumArr[i] });
//     }

//     const tip = d3
//       .select(".main-vis-container")
//       .append("div")
//       .attr("id", "tip")
//       .style("opacity", 0)

//     // var tip = d3
//     //   .select(".main-vis-container")
//     //   .append("div")
//     //   .attr("class", "tip")
//     //   .style("position", "absolute")
//     //   .style("z-index", "10")
//     //   .style("visibility", "hidden");

//     var svg = d3.select("#bar-vis").attr("class", "background-style");
//     var margin = { top: 20, right: 20, bottom: 42, left: 40 };

//     var width = 500;
//     var height = 500;

//     // var width = +svg.attr("width") - margin.left - margin.right;
//     // var height = +svg.attr("height") - margin.top - margin.bottom;

//     // const maxy = Math.max(barData.map( barDatum => barDatum.commits));
//     const maxy = Math.max.apply(Math,barData.map((barDatum) => barDatum.commits ))

//     var x = d3
//       .scaleBand()
//       .rangeRound([0, width])
//       .padding(0.05);
//     var y = d3
//       .scaleBand()
//       .rangeRound([height, 0])
//       .padding(0.05);
//       debugger

//     var g = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     x.domain(
//       barData.map(function(d) {
//         return d.day;
//       })
//     );
//     y.domain(
//       // barData.map(function(d) {
//       //   return d.commits;
//       // })
//       0
//     );

//     g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x))
//       .append("text")
//       .attr("y", 6)
//       .attr("dy", "2.5em")
//       .attr("dx", width / 2 - margin.left)
//       .attr("text-anchor", "start")
//       .text("Day");

//     g.append("g")
//       .attr("class", "axis axis--y")
//       .call(d3.axisLeft(y).ticks(20))
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", "1em")
//       .attr("text-anchor", "end")
//       .text("Commits");

//     g.selectAll(".bar")
//       .data(barData)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("transform", `scale(1,-1)translate(0,-${height})`)
//       .attr("x", function(d) {
//         return x(d.day);
//       })
//       .attr("y", function(d) {
//         return y(d.commits);
//       })
//       .attr("width", x.bandwidth())
//       .attr("height", function(d) {
//         return (d.commits / maxy) * height;
//         // return height- d3.yScale(d.commits);
//       })
//       // .on('mouseover', d => {
//       //   tip.transition().duration(200).style('opacity', 0.9);
//       //   tip.html(`Frequency: <span>${d.commits}</span>`).
//       //   style('left', `${d3.event.layerX}px`).
//       //   style('top', `${d3.event.layerY - 28}px`);
//       // })
//       // .on('mouseout', () => tip.transition().duration(500).style('opacity', 0));
//       // .on("mouseover", function(d) {
//       //   console.log(d)
//       //   tip.style("opacity", 1);
//       //   tip.html(`${d.commits} were <br/ >made on ${d.day}`)
//       //   console.log();
//       //   console.log(x.bandwidth() - 12)
//       //   // debugger
//       //   d3.select("#tip")
//       //     .style("top", yPosition + "px")
//       //     .style("left",xPosition + "px");

//       // })
//       .on("mouseover", function(d, i) {
//         //Where I'm having problems - getting the X attribute!
//         console.log(d)
//         tip.html(`${d.commits} commits `);
//         var barPos = parseFloat(
//           d3
//             .select(this.parentNode)
//             .attr("transform")
//             .split("(")[1]
//         );
document.addEventListener("DOMContentLoaded", () => {
  const userInputValue = document.querySelector("#search-user");

  const searchButton = document.querySelector(".searchButton");
  const nameContainer = document.querySelector(".main-profile-name");
  const unContainer = document.querySelector(".main-profile-un");
  const reposContainer = document.querySelector(".main-profile-repos");
  const urlContainer = document.querySelector(".main-profile-url");
  const avatarContainer = document.querySelector(".main-profile-avatar");
  const bioContainer = document.querySelector(".main-profile-bio");
  const locationContainer = document.querySelector(".main-profile-location");

  const clientId = "Iv1.9e39903e84bf3a07";
  const clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

  const fetchUsers = async user => {
    const user_api_call = await fetch(
      `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`
    );

    const userData = await user_api_call.json();
    // will lead to TypeError: Failed to execute 'json' on 'Response': body stream is locked
    // because `user_api_call` is being used twice
    // console.log(user_api_call.json());
    // console.log(userData);
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
    console.log(owner);
    console.log(repo);
    // const repo_stats_api_call = setTimeout(
    //   fetch(
    //     `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
    //   ),
    //   1000
    // );
    const repo_stats_api_call = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
    );

    const repo_stats_data = await repo_stats_api_call.json();
    console.log(repo_stats_data);
    // if (
    //     Object.keys(repo_stats_data).length === 0 &&
    //     repo_stats_data.constructor === Object
    // ) {
    //     fetchRepoStats(owner, repo);
    // }

    return repo_stats_data;
  };

  const showData = async () => {
    // console.log(fetchUsers(userInputValue.value));
    const user = await fetchUsers(userInputValue.value);
    profileData(user);
    const repoNames = await fetchRepos(user.login);
    console.log(repoNames);

    let repoStatPromises = [];
    // console.log(fetchRepoStats(user.login, repoNames[0]));
    // repoNames.forEach(async repoName => {
    //     // let repoStat = await fetchRepoStats(user.login, repoName);
    //     repoStatPromise = fetch(
    //         `https://api.github.com/repos/${user.login}/${repoName}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
    //     );
    //     console.log(repoStatPromise);
    //     let repoStatPromiseJSON = await repoStatPromise.json();
    //     repoStatPromises.push(repoStatPromiseJSON);
    // });

    for (let i = 0; i < repoNames.length; i++) {
      let repoStatPromise = fetchRepoStats(user.login, repoNames[i]);
      console.log(repoStatPromise);
      repoStatPromises.push(repoStatPromise);
    }
    console.log("these are the repoStatPromises");
    console.log(repoStatPromises);
    let repoStats = await Promise.all(repoStatPromises);
    console.log(repoStats);

    // doesn't do anything
    // let repoStats = await Promise.all(repoNamePromises);
    // console.log(repoStats);

    // totalRepoCommits = [];
    // repoStats.forEach(repoStat => {
    //     totalRepoCommit = 0;
    //     repoStat.forEach(week => {
    //         totalRepoCommit += week.total;
    //     });
    //     totalRepoCommits.push(totalRepoCommit);
    // });

    const totalRepoCommits = formatTotalRepoCommits(repoStats);
    console.log(totalRepoCommits);

    // let pieData = [];
    // for (let i = 0; i < repoNames.length; i++) {
    //   pieData.push({ repo: repoNames[i], commits: totalRepoCommits[i] });
    // }

    let pieData = formatPieData(repoNames, totalRepoCommits);
    console.log(pieData);

    const totalWeekCommits = formatTotalWeekCommits(repoStats);
    console.log(totalWeekCommits);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let barData = formatBarData(days, totalWeekCommits);
    console.log(barData);

    barGenerator(barData);
    pieGenerator(pieData);
  };

  const formatTotalWeekCommits = repoStats => {
    totalWeekCommits = Array(7).fill(0);
    repoStats.forEach(repoStat => {
      repoStat.forEach(week => {
        week.days.map((day, i) => (totalWeekCommits[i] += day));
      });
    });
    console.log(totalWeekCommits);
    return totalWeekCommits;
  };

  const formatTotalRepoCommits = repoStats => {
    totalRepoCommits = [];
    repoStats.forEach(repoStat => {
      totalRepoCommit = 0;
      repoStat.forEach(week => {
        totalRepoCommit += week.total;
      });
      totalRepoCommits.push(totalRepoCommit);
    });
    return totalRepoCommits;
  };

  const profileData = user => {
    nameContainer.innerHTML = `Name: <span class="main__profile-value">${user.name}</span>`;
    unContainer.innerHTML = `Username: <span class="main__profile-value">${user.login}</span>`;
    reposContainer.innerHTML = `Repos: <span class="main__profile-value">${user.public_repos}</span>`;
    avatarContainer.innerHTML = `<img src="${user.avatar_url}" alt="avatar">`;
    bioContainer.innerHTML = `Bio: <span class="main__profile-value">${user.bio}</span>`;
    locationContainer.innerHTML = `Location: <span class="main__profile-value">${user.location}</span>`;
  };

  const formatPieData = (repoNames, totalRepoCommits) => {
    let pieData = [];
    for (let i = 0; i < repoNames.length; i++) {
      pieData.push({ repo: repoNames[i], commits: totalRepoCommits[i] });
    }
    return pieData;
  };

  const formatBarData = (days, totalWeekCommits) => {
    let barData = [];
    for (let i = 0; i < days.length; i++) {
      barData.push({ day: days[i], commits: totalWeekCommits[i] });
    }
    return barData;
  };

  const pieGenerator = pieData => {
    d3.selectAll("#pie-vis > *").remove();
    d3.select(".main-vis-container > div#tooltip").remove();

    var width = 500;
    var height = 500;
    var innerRadius = 0;
    var outerRadius = Math.min(width, height) / 2;

    var color = d3
      .scaleOrdinal()
      .domain(pieData)
      .range([
        "#d4c685",
        "#f7ef81",
        "#cfe795",
        "#a7d3a6",
        "#add2c2",
        "#d3ac00",
        "#f7e600",
        "#a2e800",
        "#03d300",
        "#00d176"
      ]);
    var pie = d3.pie().value(function(d) {
      return d.commits;
    });

    var div = d3
      .select(".main-vis-container")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    var svg = d3
      .select("#pie-vis")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    var arc = d3.arc().innerRadius(0).outerRadius(outerRadius);

    var path = svg
      .datum(pieData)
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("fill", (d, i) => {
        return color(i);
      })
      .attr("d", arc)
      .on("mouseover", function(d) {
        // console.log(data_ready);
        // console.log(d);
        div.style("opacity", 1);

        div.html(`${d.data.repo} has <br/> ${d.data.commits} commits`);
      })
      .on("mousemove", function(d) {
        d3
          .select("#tooltip")
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function() {
        d3.select("#tooltip").style("opacity", 0);
      })
      .each(function() {
        this._current = {
          startAngle: 0,
          endAngle: 0
        };
      })
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);

        return function(t) {
          return arc(interpolate(t));
        };
      });
  };

  const barGenerator = barData => {
    d3.selectAll("#bar-vis > *").remove();
    d3.select(".main-vis-container > #tip").remove();

    const tip = d3
      .select(".main-vis-container")
      .append("div")
      .attr("id", "tip")
      .style("opacity", 0);

    // var tip = d3
    //   .select(".main-vis-container")
    //   .append("div")
    //   .attr("class", "tip")
    //   .style("position", "absolute")
    //   .style("z-index", "10")
    //   .style("visibility", "hidden");

    var svg = d3.select("#bar-vis").attr("class", "background-style");
    var margin = { top: 20, right: 20, bottom: 42, left: 40 };

    var width = 500;
    var height = 500;

    // var width = +svg.attr("width") - margin.left - margin.right;
    // var height = +svg.attr("height") - margin.top - margin.bottom;

    // const maxy = Math.max(barData.map( barDatum => barDatum.commits));
    const maxy = Math.max.apply(
      Math,
      barData.map(barDatum => barDatum.commits)
    );

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.05);
    var y = d3.scaleBand().rangeRound([height, 0]).padding(0.05);
    debugger;

    var g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

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

    g
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("y", 6)
      .attr("dy", "2.5em")
      .attr("dx", width / 2 - margin.left)
      .attr("text-anchor", "start")
      .text("Day");

    g
      .append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(20))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "1em")
      .attr("text-anchor", "end")
      .text("Commits");

    g
      .selectAll(".bar")
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
        return d.commits / maxy * height;
        // return height- d3.yScale(d.commits);
      })
      // .on('mouseover', d => {
      //   tip.transition().duration(200).style('opacity', 0.9);
      //   tip.html(`Frequency: <span>${d.commits}</span>`).
      //   style('left', `${d3.event.layerX}px`).
      //   style('top', `${d3.event.layerY - 28}px`);
      // })
      // .on('mouseout', () => tip.transition().duration(500).style('opacity', 0));
      // .on("mouseover", function(d) {
      //   console.log(d)
      //   tip.style("opacity", 1);
      //   tip.html(`${d.commits} were <br/ >made on ${d.day}`)
      //   console.log();
      //   console.log(x.bandwidth() - 12)
      //   // debugger
      //   d3.select("#tip")
      //     .style("top", yPosition + "px")
      //     .style("left",xPosition + "px");

      // })
      .on("mouseover", function(d, i) {
        //Where I'm having problems - getting the X attribute!
        console.log(d);
        tip.html(`${d.commits} commits `);
        var barPos = parseFloat(
          d3.select(this.parentNode).attr("transform").split("(")[1]
        );

        var xPosition = barPos + x(d.day) + 50;
        var yPosition = -parseFloat(d3.select(this).attr("height")) + 900;
        debugger;
        console.log(yPosition);
        //Update the tooltip position and value
        d3
          .select("#tip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px");

        //Show the tooltip
        d3.select("#tip").style("opacity", 1);
      })
      // .on("mousemove", function(d) {

      // })
      .on("mouseout", function() {
        d3.select("#tip").style("opacity", 0);
      });
  };

  userInputValue.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInputValue.value !== "") {
        showData();
        showData();
      }
    }
  });
});

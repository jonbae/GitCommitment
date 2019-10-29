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
    console.log(repo);
    const repo_stats_api_call = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`
    );
    console.log(repo_stats_api_call);
    const repo_stats_data = (await repo_stats_api_call.json()) || [];
    console.log(repo_stats_data);

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
          const repoStats = await fetchRepoStats(
            userInputValue.value,
            repoName
          );
          let dayCommitArr = Array(7).fill(0);
          repoStats.map(repoStat => {
            repoStat.days.map((day, i) => (dayCommitArr[i] += day));
          });
          return dayCommitArr;
        })
      );
      console.log(reposWeekCommits);
      let sumArr = Array(7).fill(0);
      reposWeekCommits.map(repoDayCommits =>
        repoDayCommits.map((repoDayCommit, i) => (sumArr[i] += repoDayCommit))
      );
      console.log(sumArr);

      let barData = [];

      for (let i = 0; i < days.length; i++) {
        barData.push({ day: days[i], commits: sumArr[i] });
      }

      console.log(barData);
 


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
      console.log(height);

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
        barData.map(function(d) {
          return d.commits;
        })
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
        .attr("x", function(d) {
          return x(d.day);
        })
        .attr("y", function(d) {
          return y(d.commits);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return height - y(d.commits);
        })
        .on("mouseover", function(d) {
          return tip
            .text(d.commits)
            .style("visibility", "visible")
            .style("top", y(d.commits) - 13 + "px")
            .style("left", x(d.grad_year) + x.bandwidth() - 12 + "px");
        })
        //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function() {
          return tip.style("visibility", "hidden");
        });

    };

    searchButton.addEventListener("click",()=>{
      if(userInputValue.value!= ""){
        showData(); 
        repoBarGraph(); 
      }
    })

    userInputValue.addEventListener("keydown", e => {
      if(e.key === "Enter") {
        e.preventDefault(); 
        if(userInputValue.value !== ""){
          showData(); 
          repoBarGraph(); 
        }
      }
    })


})
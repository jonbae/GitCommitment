const userInputValue = document.querySelector("#search-user");
// const repoInputValue = document.querySelector("#search-repo");

const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
const commitContainer = document.querySelector(".main__profile-commits"); 

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


  // storage start 

  // storage end 
  const repoNames = await fetchRepos(userInputValue.value)



  const repoCommits = await Promise.all( repoNames.map( async (repoName) => {
     const repoStat = await fetchRepoStats(userInputValue.value,repoName); 
    //  console.log(repoStat);
     return repoStat; 
    })
  ); 
  console.log(repoNames)
  console.log(repoCommits); 

}

searchButton.addEventListener("click", ()=>{
  showData(); 
})




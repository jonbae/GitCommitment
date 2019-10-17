const userInputValue = document.querySelector("#search-user");
const repoInputValue = document.querySelector("#search-repo");

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
   
  const user_data = await user_api_call.json(); 
  return { userData: user_data };
};

const fetchRepos = async (owner, repo) => {
  const repo_api_call = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`);

  const repo_data = await repo_api_call.json(); 
  return { repoData: repo_data };

}

const showData = () => {
  fetchUsers(userInputValue.value).then(res => {
    console.log(res)
    nameContainer.innerHTML = `Name: <span class="main__profile-value">${res.userData.name}</span>`
    unContainer.innerHTML = `Username: <span class="main__profile-value">${res.userData.login}</span>`
    reposContainer.innerHTML = `Repos: <span class="main__profile-value">${res.userData.public_repos}</span>`
    urlContainer.innerHTML = `url: <span class="main__profile-value">${res.userData.html_url}</span>`
  }); 

  fetchRepos(userInputValue.value, repoInputValue.value).then(res => {
    console.log(res)
    console.log(typeof res)
    console.log(res.repoData)

    let sum = 0; 
    res.repoData.map( ele => {
      return sum+=ele.total
    })
    // console.log(sum)
                                                                                                      
    res.repoData.map( ele => {
      console.log(ele.week);
      ele.days.map( day => {
        console.log(day);
      })
    })

    commitContainer.innerHTML = `Repo Commits: <span class="main__profile-value">${sum}</span>`
  })

}

searchButton.addEventListener("click", ()=>{
  showData(); 
})


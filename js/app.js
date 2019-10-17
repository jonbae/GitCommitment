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


const fetchRepos = async (owner) => {
  const repo_api_call = await fetch(
    `https://api.github.com/users/${owner}/repos?client_id=${clientId}&client_secret=${clientSecret}`
    
    
    );
    const repo_data = await repo_api_call.json(); 
    console.log(repo_data[0].full_name)
    return {repoData: repo_data }; 
  }

const fetchRepoStats = async (ownerRepo) => {
  const repo_stats_api_call = await fetch(`https://api.github.com/repos/${ownerRepo}/stats/commit_activity?client_id=${clientId}&client_secret=${clientSecret}`);

  const repo_stats_data = await repo_stats_api_call.json(); 

  return { repoStats: repo_stats_data };

}

const showData = () => {
  fetchUsers(userInputValue.value).then(res => {
    nameContainer.innerHTML = `Name: <span class="main__profile-value">${res.userData.name}</span>`
    unContainer.innerHTML = `Username: <span class="main__profile-value">${res.userData.login}</span>`
    reposContainer.innerHTML = `Repos: <span class="main__profile-value">${res.userData.public_repos}</span>`
    urlContainer.innerHTML = `Url: <span class="main__profile-value">${res.userData.html_url}</span>`
  }); 

  // fetchRepoStats(userInputValue.value, repoInputValue.value).then(res => {
  //   // console.log(res)
  //   // console.log(typeof res)
  //   // console.log(res.repoStats)

  //   let sum = 0; 
  //   res.repoStats.map( ele => {
  //     return sum+=ele.total
  //   })
                                                                                                      
  //   // res.repoStats.map( ele => {
  //   //   console.log(ele.week);
  //   //   ele.days.map( day => {
  //   //     console.log(day);
  //   //   })
  //   // })

  //   commitContainer.innerHTML = `Repo Commits: <span class="main__profile-value">${sum}</span>`
  // })

  fetchRepos(userInputValue.value).then(userRes => {
    // console.log(typeof userRes.repoData)
    // console.log(userRes.repoData);
    // userRes.repoData.map( ele => console.log(ele.full_name))
    const userRepos = userRes.repoData.map( ele => ele.full_name)
    const userRepoName = userRes.repoData.map( ele => ele.name )
    console.log(userRepos);
    console.log(userRepoName)

    const promiseArr = []; 
    let sums =  []; 
    
    userRepos.map( userRepo => {
      let sum = 0; 
      promiseArr.push( fetchRepoStats(userRepo).then(res => {
        return res.repoStats.map( ele => {
          
          return sum += ele.total; 
        })
        
      }))
    })

    console.log(promiseArr);
    console.log("_");

    Promise.all(promiseArr).then(
      data => {
        data.map(
          datum => {
            sums.push(datum[datum.length-1])
            console.log(datum[datum.length-1])
            return datum[datum.length-1]
          })
      })
    


    // let userSum = 0;
    // userRepos.map( userRepo => {
    //   let sum = 0;
    //   fetchRepoStats(userRepo).then(res => {
    //     console.log("this is the start of a repo");
          
    //       res.repoStats.map( ele => {
    //         return sum += ele.total;
    //       })
    //       console.log(sum); 
    //     console.log("this is the end of a repo");
        
    //   })
    //   console.log(userSum)  
    //   return userSum += sum;

    // }) 
    
    // console.log(userSum)    

  })
  
  ;

}

searchButton.addEventListener("click", ()=>{
  showData(); 
})





// fetchRepos(userInputValue.value).then(userRes => {
//   const userRepos = userRes.repoData.map( ele => ele.full_name)
//   return userRepos; 
// }).then( userRepos => {
//   userRepos.map( userRepo => {
//     let sum = 0; 
    
//   })
// })
let name = document.querySelector ('.name');
let username = document.querySelector ('.username');
let bio = document.querySelector ('.description');
let publicRepos = document.querySelector ('.repo-num');
let userImg = document.querySelector ('.user-icon');
let container = document.getElementById ('container-div');
let currentYear = document.querySelector ('.current-year');


let currentUser = window.location.search.slice(10) 



currentYear.innerHTML = new Date ().getFullYear ();

async function fetchGithubData () {
  let response = await fetch (`https://api.github.com/users/${currentUser}`)
    .then (res => res.json ())
    .then (data => {
      name.innerHTML = data.name;
      username.innerHTML = data.login;
      bio.innerHTML = data.bio;
      publicRepos.innerHTML = data.public_repos;
      userImg.src = data.avatar_url;
    })
    .catch (err => console.log (err));
}

async function fetchGithubRepos () {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  let updatedMonth = '';
  let response = await fetch (`https://api.github.com/users/${currentUser}/repos`)
    .then (res => res.json ())
    .then (data => {
      let updatedData = data.splice (1, 20);
      for (var i = 0; i < updatedData.length; i++) {
        const div = document.createElement ('div');
        div.classList.add ('repo-name');
        div.innerHTML = `<div>
      <a href=${updatedData[i].svn_url} class="project-name">${updatedData[i].name}</a>
    </div>
    <div >
      <a href="#" class="star">
        <button class="btn-star">
          <i class="far fa-star"></i> Star

        </button>
      </a>
    </div>
    `;
        month.map (item => {
          let monthOfPush = updatedData[i].updated_at
            .slice (5, 7)
            .split ('-')
            .reverse ();
          let convertDate = Number (monthOfPush);
          let conv = convertDate - 1
          updatedMonth = month[conv];
          
        });


        let yearOfPush = updatedData[i].updated_at
          .slice (0, 4)
          .split ('-')
          .reverse ();

        let dayOfPush = updatedData[i].updated_at
          .slice (8, 10)
          .split ('-')
          .reverse ();

        let description = document.createElement ('p');
        if (updatedData[i].description !== null) {
          description.classList.add ('repo-description');
        } else {
          description.classList.add ('no-repo-description');
        }
        description.innerHTML = updatedData[i].description;

        const details = document.createElement ('div');
        details.classList.add ('repo-details');
        details.innerHTML = `
        ${updatedData[i].language !== null && updatedData[i].language == 'CSS' ? `  <div>
        <p><i class="fas fa-circle language-css"></i> ${updatedData[i].language}</p>
    </div>` : updatedData[i].language == 'JavaScript' ? `  <div>
    <p><i class="fas fa-circle language-js"></i> ${updatedData[i].language}</p>
</div>` : updatedData[i].language == 'HTML' ? `  <div>
<p><i class="fas fa-circle language-html"></i> ${updatedData[i].language}</p>
</div>` : updatedData[i].language == 'TypeScript' ? `  <div>
<p><i class="fas fa-circle language-ts"></i> ${updatedData[i].language}</p>
</div>` : updatedData[i].language == 'Dart' ? `  <div>
<p><i class="fas fa-circle language-dart"></i> ${updatedData[i].language}</p>
</div>` : updatedData[i].language == 'Shell' ? `  <div>
<p><i class="fas fa-circle language-shell"></i> ${updatedData[i].language}</p>
</div>` : `<span></span>`}
  
${updatedData[i].stargazers_count !== 0 ? `<div><p><i class="far fa-star"></i> ${updatedData[i].stargazers_count}</p> </div>` : `<span></span>`}

${updatedData[i].forks_count !== 0 ? `<div><p><i class="fas fa-code-branch"></i> ${updatedData[i].forks_count}</p></div>` : `<span></span>`}
    
<div>
  <p>Updated on <span>${updatedMonth + ' ' + dayOfPush + ', ' + yearOfPush} </span></p>
</div>
    `;
        container.append (div, description, details);
      }
    })
    .catch (err => console.log (err));
}


fetchGithubData ();
fetchGithubRepos ();




const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')

toggleButton.addEventListener('click', () => {
  for(var i =0; i < navbarLinks.length; i++){
  navbarLinks.item(i).classList.toggle('active')

  }
})
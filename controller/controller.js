const fetch = require('node-fetch')

const home = (req, res) => {
  res.render('pages/index', {/* vars here*/});
};

const myWork = (req, res) => {
  const username = "Bram-ter"
  let url = `https://api.github.com/users/${username}/repos`

  fetch(url)
    .then(response => response.json())
    .then(repos => {
      res.render('pages/my-work', { repos });
    })
    .catch(error => console.error(error));
};

const details = (req, res) => {
  // const username = "Bram-ter"
  // let url = `https://api.github.com/users/${username}/repos`

  const username = "Bram-ter"
  const repoName = req.params.repoName; // get the repository name from request params
  let url = `https://api.github.com/repos/${username}/${repoName}`;

  fetch(url)
    .then(response => response.json())
    .then(repo => {
      res.render('pages/details', { repo });
      console.log(repo)
    })
    .catch(error => console.error(error));
};

module.exports = {
  home,
  myWork,
  details
}
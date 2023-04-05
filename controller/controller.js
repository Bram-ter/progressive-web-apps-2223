const fetch = require('node-fetch')

const home = (req, res) => {
  res.render('pages/index', {});
};

const offline = (req, res) => {
  res.render('pages/error', {});
};

const myWork = (req, res) => {
  const username = "Bram-ter"
  let url = `https://gh-pinned-repos.egoist.dev/?username=${username}`

  fetch(url)
    .then(response => response.json())
    .then(projects => {
      res.render('pages/my-work', { projects });
      console.log(projects)
    })
    .catch(error => console.error(error));
};

const details = (req, res) => {
  const username = "Bram-ter"
  const repoName = req.params.repoName;
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
  details,
  offline
}
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
      console.log(repos)
      res.render('pages/my-work', { repos });
    })
    .catch(error => console.error(error));
};

module.exports = {
  home,
  myWork
}
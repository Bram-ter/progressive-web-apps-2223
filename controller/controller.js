const home = (req, res) => {
  res.render('pages/index', {/* vars here*/});
};

const myWork = (req, res) => {
  res.render('pages/my-work', {/* vars here*/});
};

module.exports = {
  home,
  myWork
}
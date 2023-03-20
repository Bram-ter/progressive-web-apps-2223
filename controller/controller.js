const home = (req, res) => {
  res.render('pages/index', {/* Hier voor quotes / vars */});
};

module.exports = {
  home,
}
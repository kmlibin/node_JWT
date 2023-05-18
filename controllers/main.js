const login = async (req, res) => {
  res.send("Fake login register signup");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({ msg: `hello user`, secret: `authorized data is ${luckyNumber}` });
};

module.exports = { login, dashboard };

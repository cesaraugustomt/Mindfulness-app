const jwt = require("jsonwebtoken");
const secret = "sdfsdfhejhwer" //UUID


module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];

    try {
      var decoded = jwt.verify(token, secret);

      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("Você não tem permissão para isso!");
      }
    } catch (err) {
      res.status(403);
      res.send("Você não pode acessar essa rota!");
      console.log(err);
    }
  } else {
    res.status(403);
    res.send("Você não está cadastrado");
    return;
  }
};
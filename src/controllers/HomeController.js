// const axios = require('axios');

class HomeController {
    async index(req, res) {
      res.send("APP EXPRESS! ");
    }
  
    async validate(req, res) {
      res.send("Okay");
    }
  }

module.exports = new HomeController();
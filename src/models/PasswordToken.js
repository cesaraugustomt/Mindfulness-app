const knex = require("../database/connection");
const User = require("./User");

class PasswordToken {
  async createToken(email) {
    var userEmail = await User.findByEmail(email);
    if (userEmail != undefined) {
      try {
        var token = Date.now(); //UUID
        await knex
          .insert({ user_id: userEmail.id, used: 0, token: token })
          .table("passwordtokens");
        return { status: true, token: token };
      } catch (err) {
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "O e-mail passado não foi registrado!" };
    }
  }

  async validateToken(token) {
    try {
      var result = await knex
        .select()
        .where({ token: token })
        .table("passwordtokens");
      if (result.length > 0) {
        var usingResultToken = result[0];
        if (usingResultToken.used) {
          return { status: false, err: "Esse token já foi usado!" };
        } else {
          return { status: true, token: usingResultToken };
        }
      } else {
        return { status: false, err: "Token é inválido!" };
      }
    } catch (err) {
      console.log(err);
      return {
        status: false,
        err: "Houve um erro, tente novamente mais tarde.",
      };
    }
  }

  async setUsed(token) {
    await knex
      .update({ used: 1 })
      .where({ token: token })
      .table("passwordtokens");
  }
}

module.exports = new PasswordToken();
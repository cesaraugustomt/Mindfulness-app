const User = require('../models/User');
const PasswordToken = require('../models/PasswordToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//config jwt
const secret = "sdfsdfhejhwer" //UUID


class UserController{

  async index(req, res){
    const users = await User.listUsers();
    res.json(users);
  }

  async create(req, res){
    var {email, name, password, cpf} = req.body;

    if(email == undefined){
      res.status(400);
      res.json({err: "E-mail inválido!"})
      return;
    }

    const emailExists =  await User.findEmail(email);
    if(emailExists){
      res.status(406);
      res.json({err: "O e-mail já está cadastrado."})
      return;
    }

    const cpfExists =  await User.findCpf(cpf);
    if(cpfExists){
      res.status(406);
      res.json({err: "O cpf já está cadastrado."})
      return;
    }

    await User.create(name,cpf,email,password);

    res.status(200);
    res.send("tudo ok!");
  }

  async findUser(req, res){
    const id = req.params.id;
    const user = await User.findById(id);
    if(user == undefined){
      res.status(404);
      res.json({});
    }else {
     res.status(200);
     res.json(user);
    }
  }

  async editUser(req, res) {
    var { id, name, cpf, email, role } = req.body;
    var resultEdit = await User.update(id, name, cpf, email, role);

    if (resultEdit != undefined) {
      if (resultEdit.status) {
        res.status(200);
        res.send("update realizado com sucesso!");
      } else {
        res.status(406);
        res.send(resultEdit.err);
      }
    } else {
      res.status(406);
      res.send("Ocorreu um erro!");
    }
  }

  async remove(req, res) {
    var id = req.params.id;
    var result = await User.delete(id);

    if (result.status) {
      res.status(200);
      res.send("usuário deletado com sucesso!");
    } else {
      res.status(406);
      res.send(result.err);
    }
  }

    async recoverPassword(req, res) {
      var email = req.body.email;
      var result = await PasswordToken.createToken(email);
  
      if (result.status) {
        res.status(200);
        //mail send
        res.send("" + result.token);
        console.log("" + result.token)
      } else {
        res.status(406);
        res.send(result.err);
        console.log(result.err);
      }
    }
  
    async changePassword(req, res) {
      var token = req.body.token;
      var password = req.body.password;
  
      var validationToken = await PasswordToken.validateToken(token);
  
      if (validationToken.status) {
        await User.changePassword(
          password,
          validationToken.token.user_id,
          validationToken.token.token
        );
        await PasswordToken.setUsed(token);
  
        res.status(200);
        res.send("Senha alterada com sucesso!");
      } else {
        res.status(406);
        res.send(validationToken.err);
      }
    }
  
    async login(req, res) {
      var { cpf, password } = req.body;
  
      var user = await User.findCpf(cpf);
  
      if (user != undefined) {
        var resultLogin = await bcrypt.compare(password, user.password);
  
        if (resultLogin) {
          var token = await jwt.sign(
            { cpf: user.cpf, role: user.role },
            secret
          );
  
          res.status(200);
          res.json({ token: token });
          console.log("usuário logado com sucesso!");
        } else {
          res.status(406);
          res.json({ err: "Senha incorreta!" });
        }
      } else {
        res.status(406);
        res.json({ err: "O usuário não está cadastrado!" });
      }
    }
}

module.exports = new UserController();
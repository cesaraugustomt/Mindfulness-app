const knex = require("../database/connection");
const bcrypt = require("bcryptjs");

class User{

  async create(name,cpf,email,password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await knex.insert({name,cpf,email,password:hash,role:1}).table("users")
    }catch(error){
      console.log(error)
    }
  }

  async findEmail(email){
    try{
      const result = await knex.select("*").from("users").where({email: email});
      if(result.length > 0){
        return true;
      }else{
        return false;
      }
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async findCpf(cpf){
    try{
      const result = await knex.select(["id","email","password","cpf","name","role"]).where({cpf:cpf}).table("users");
      if(result.length > 0){
        return result[0];
      }else {
        return undefined;
      }
     }catch(error){
       console.log(error);
       return undefined;
     }
  }

  async listUsers(){
   try{
    const result = await knex.select(["id","email","cpf","name","role"]).table("users");
    return result;
   }catch(error){
     console.log(error);
     return [];
   }
  }
  async findById(id){
    try{
      const result = await knex.select(["id","email","cpf","name","role"]).where({id:id}).table("users");
      if(result.length > 0){
        return result[0];
      }else {
        return undefined;
      }
     }catch(error){
       console.log(error);
       return undefined;
     }
  }

  async findByEmail(email){
    try{
      const result = await knex.select(["id","email","password","cpf","name","role"]).where({email:email}).table("users");
      if(result.length > 0){
        return result[0];
      }else {
        return undefined;
      }
     }catch(error){
       console.log(error);
       return undefined;
     }
  }

  async update(id, name, cpf, email, role) {
    var user = await this.findById(id);
    if (user != undefined) {
      var newObject = {}; //enviar para o BD.

      if (email != undefined) {
        if (email != user.email) {
          var validedEmailResult = await this.findEmail(email);
          if (validedEmailResult == false) {
            newObject.email = email;
          } else {
            return { status: false, err: "O e-mail já está cadastrado!"};
          }
        }
      }
      if (name != undefined) {
        newObject.name = name;
      }

      if (cpf != undefined) {
        newObject.cpf = cpf;
      }
      if (role != undefined) {
        newObject.role = role;
      }

      try {
        await knex.update(newObject).where({ id: id }).from("users");
        return { status: true };
      } catch (err) {
        return { status: 406, err: "Não foi possivel fazer o update" };
      }
    } else {
      return { status: false, err: "O usuário não existe!" };
    }
  }

  async delete(id) {
    var user = await this.findById(id);
    if (user != undefined) {
      try {
        await knex.del().where({ id: id }).from("users");
        return { status: true };
      } catch (err) {
        return { status: false, err: "Tente novamente!" };
      }
    } else {
      return { status: false, err: "Esse usuário não existe!" };
    }
  }

  async changePassword(newPassword, id, token) {
    var hash = await bcrypt.hash(newPassword, 10);

    await knex.update({ password: hash }).where({ id: id }).table("users");
  }
}

module.exports = new User();
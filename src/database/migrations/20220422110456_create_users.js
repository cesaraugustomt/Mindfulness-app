exports.up = function(knex) {

  return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name', 50).notNullable();
      table.string('cpf', 11).unique().notNullable();
      table.string('email', 150).unique().notNullable();
      table.string('password', 200).notNullable();
      table.integer('role', 2).notNullable();

      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

    }).then((result) =>{
      return result
  })
  .catch((err) => {
      return err
  }) 

};

exports.down = function(knex) {

  return knex.schema.dropTable('users')

};
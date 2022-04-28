exports.up = function(knex) {

  return knex.schema.createTable('passwordtokens', function (table) {
      table.increments('id').primary();
      table.string('token', 200).notNullable();
      // relationship
      table.integer('user_id', 10).references('users.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('used', 3).notNullable()
      
      table.timestamps(true, true);

    }).then((result) =>{S
      return result
  })
  .catch((err) => {
      return err
  }) 

};

exports.down = function(knex) {

  return knex.schema.dropTable('passwordtokens')

};
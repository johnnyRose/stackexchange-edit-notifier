
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
      t.increments('id').unsigned().primary();
      t.string('email').notNull();
      t.integer('userId', 12).notNull();
      t.string('site').notNull();
      t.dateTime('insertDate').notNull();
      t.boolean('isSubscribed').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

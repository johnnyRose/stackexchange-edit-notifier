
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
     t.uuid('unsubscribeId').notNull().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
     t.dropColumn('unsubscribeId');
  });
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('stackExchangeSites', function (t) {
      t.string('siteData', 500000).primary();
      t.dateTime('lastCacheDate').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stackExchangeSites');
};

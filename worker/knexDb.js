
var knexFile = require('../knexfile');
var knex = require('knex')

module.exports = knex(knexFile.development);

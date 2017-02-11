var knex = require("knex");
var knexFile = require("../../knexfile");
var db = knex(knexFile.development);
var router = require("express-promise-router")();

router.get('/', function (request, response) {
    response.render('home');
});

router.post('/', function (request, response) {
    console.log(request.body);
    var user = {
        email: request.body.email,
        userId: request.body.userId,
        site: request.body.site,
        insertDate: new Date(),
    };

    db('users').insert(user).then(function () {
        db('users').select().then(function (r) {
            console.log(r);
        })
    });
});

module.exports = router;

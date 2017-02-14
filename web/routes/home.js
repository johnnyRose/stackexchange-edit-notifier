var db = require('../../worker/knexDb');
var router = require("express-promise-router")();

router.get('/', function (request, response) {
    response.render('home');
});

router.post('/', function (request, response) {
    var user = {
        email: request.body.email,
        userId: request.body.userId,
        site: request.body.site,
        insertDate: new Date(),
    };

    db('users').insert(user).then(function () {
        db('users').select().then(function (r) {
            console.log(r);
        });
    });
    
    response.render('home');
});

module.exports = router;

var db = require('../../worker/knexDb');
var router = require("express-promise-router")();

router.get('/', function (request, response) {
    
    var test = 123;
    
    response.render('home', { test: test });
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

router.get('/GetAllSites', function (request, response) {
    db('stackExchangeSites').select().then(function (sites) {
       response.setHeader('Content-Type', 'application/json');
       response.send(JSON.stringify(sites));
    });
});

module.exports = router;

var db = require('../../worker/knexDb');
var router = require("express-promise-router")();
var uuid = require('uuid/v4');

router.get('/', function (request, response) {
    response.render('home');
});

router.post('/', function (request, response) {
    if (validate(request)) {
        var user = {
            email: request.body.email,
            userId: request.body.userId,
            site: request.body.site,
            insertDate: new Date(),
            unsubscribeId: uuid(),
        };
    
        db('users').insert(user).then(
            function () {
                db('users').select().then(
                    function (r) {
                        console.log(r);
                        
                        response.send(JSON.stringify({ success: true }));
                    }
                );
            }
        ).catch(
            function (error) {
                response.send(JSON.stringify({ success: false }));
            }
        );
    }
    
});

function validate(request) {
    return request.body.email && request.body.userId > 0 && request.body.site;
}

router.get('/GetAllSites', function (request, response) {
    db('stackExchangeSites').select().then(
        function (sites) {
           response.setHeader('Content-Type', 'application/json');
           response.send(JSON.stringify(sites));
        }
    );
});

module.exports = router;

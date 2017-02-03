
var router = require("express-promise-router")();

router.get('/', function (request, response) {
   response.render('home');
});

module.exports = router;

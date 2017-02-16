var db = require('./knexDb');

var emailer = {
    sendEmailAlerts: function (posts) {
        return new Promise(function (resolve, reject) {
            db('users').select().then(function (u) {
               console.log(u);
               resolve();
            });
        });
    }
};

module.exports = emailer;

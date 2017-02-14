var cron = require('node-cron');
var stackApi = require("./stackApi");
var emailer = require('emailer');

var worker = {
    
    start: function () {
        // Schedule this job to run every minute.
        cron.schedule("* * * * *", function () {
            stackApi.getAllRecentlyEditedPosts()
                .then(function (results) {
                    if (results.items.length) {
                        emailer.sendEmailAlerts(results);
                    } else {
                        console.log(new Date() + ": No data returned.");
                    }
                });
        });
    }
    
};

module.exports = worker;

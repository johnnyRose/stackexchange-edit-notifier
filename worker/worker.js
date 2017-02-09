var cron = require('node-cron');
var stackApi = require("./stackApi");

var worker = {
    
    start: function () {
        // Schedule this job for every 10 seconds for now.
        cron.schedule("*/10 * * * * *", function () {
            var test = stackApi.getAllRecentlyEditedPosts()
                .then(function (results) {
                    if (results.items.length) {
                        console.log(results); 
                    } else {
                        console.log(new Date() + ": No data returned.");
                    }
                });
        });
    }
    
};

module.exports = worker;

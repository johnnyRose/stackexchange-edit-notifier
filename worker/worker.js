var cron = require('node-cron');
var stackApi = require("./stackApi");

var worker = {
    
    start: function () {
        // Schedule this job for every 10 seconds for now.
        cron.schedule("*/10 * * * * *", function () {
            stackApi.getAllRecentlyEditedPosts();
        });
    }
    
};

module.exports = worker;

var cron = require('node-cron');
var stackApi = require("./stackApi");
var emailer = require('./emailer');

var knex = require('knex');
var knexFile = require('../knexfile');
var db = knex(knexFile.development);

function updateSitesCache() {
  
    db('stackExchangeSites').select().then(
        function (sitesInDatabase) {
            // Make sure our sites list have been updated in the last 24 hours; if not, update it.
            var targetDate = new Date();
            targetDate.setDate(targetDate.getDate() - 1);
            var needToUpdate = sitesInDatabase.length === 0 || sitesInDatabase[0]['lastCacheDate'] < targetDate;
            console.log("Need to update sites: " + needToUpdate);
            
            if (needToUpdate) {
                stackApi.getAllSites().then(
                    function (updatedSites) {
                        var recordForDb = { 
                            siteData: JSON.stringify(updatedSites), 
                            lastCacheDate: new Date() 
                        };
                        
                        if (sitesInDatabase.length === 0) {
                            // We need to insert
                            db('stackExchangeSites').insert(recordForDb).then(function () {
                                // .then is required for execution
                                console.log("Inserted!");
                            });
                        } else {
                            // We need to update
                            db('stackExchangeSites').update(recordForDb).then(function () {
                                // .then is required for execution
                                console.log("Updated!");
                            });
                        }
                    }    
                );
            }
        }
    );
  
}

function getEditedPosts() {
    stackApi.getAllRecentlyEditedPosts().then(
        function (results) {
            if (results.items.length) {
                emailer.sendEmailAlerts(results);
            } else {
                console.log(new Date() + ": No data returned.");
            }
        }
    );
}

var worker = {
    
    startPostNotifier: function () {
        
        updateSitesCache();
        
        // Updates the list of Stack Exchange Sites in the DB.
        // This should be run once a day at 4am, and immediately upon startup.
        cron.schedule("00 04 * * *", updateSitesCache);
        
        // Checks all events in the last minute for posts edited by any subscriber.
        // Schedule this job to run every minute. Running this at startup could risk duplicate notifications
        // unless we happen to start the app right on the minute mark (since we don't currently log when we send an email - 
        // we just look at activity in the last 60 seconds, every 60 seconds).
        cron.schedule("* * * * *", getEditedPosts);
    }
    
};

module.exports = worker;

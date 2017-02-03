
var worker = {
    
    start: function () {
        var cron = require('node-cron');
        
        var minutes = 0;
        
        cron.schedule("* * * * *", function () {
            console.log(`Running ${minutes} ${(minutes === 1 ? "minute" : "minutes")}.`);
            minutes++;
        });
    }
    
};

module.exports = worker;

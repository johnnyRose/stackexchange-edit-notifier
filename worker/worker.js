var http = require("http");
var zlib = require("zlib");

var worker = {
    
    start: function () {
        var cron = require('node-cron');
        
        var minutes = 0;
        
        cron.schedule("*/10 * * * * *", function () {
            console.log(`Running ${minutes} ${(minutes === 1 ? "minute" : "minutes")}.`);
            
            var url = "http://api.stackexchange.com/2.2/info?site=stackoverflow";
            
            
            // https://gist.github.com/ORESoftware/9d27e3ed392e2eefb123
            getGzipped(url, function (err, data) {
                if(err){
                    console.error(err);
                }
                else{
                    console.log(data);
                }
            });
            
            function getGzipped(url, callback) {
                // buffer to store the streamed decompression
                var buffer = [];
            
                http.get(url, function (res) {
                    // pipe the response into the gunzip to decompress
                    var gunzip = zlib.createGunzip();
                    res.pipe(gunzip);
            
                    gunzip.on('data', function (data) {
                        // decompression chunk ready, add it to the buffer
                        buffer.push(data.toString())
            
                    }).on("end", function () {
                        // response and decompression complete, join the buffer and return
                        callback(null, buffer.join(""));
            
                    }).on("error", function (e) {
                        callback(e);
                    })
                }).on('error', function (e) {
                    callback(e)
                });
            }
            
        });
    }
    
};

module.exports = worker;

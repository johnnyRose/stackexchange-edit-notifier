var https = require("https");
var zlib = require("zlib");
var sleep = require('sleep');

var baseUrl = "https://api.stackexchange.com/2.2/";

function getAllRecentlyEditedPosts() {
    getAllRecentlyEditedPostEvents()
        .then(function (postIds) {
            var postsPath = `posts/${postIds}?pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=!0S2DU84KBii0TP2pzjFB-BAaU`;
            var url = baseUrl + postsPath;
            
            queryStackExchangeApi(url).then(function (results) {
               results.items = results.items.filter(function (item) {
                  return item.owner.user_id !== item.last_editor.user_id; 
               });
               
               console.log(results);
            });
        });
}

function getAllRecentlyEditedPostEvents(postIds, pageNumber) {
    
    pageNumber = pageNumber || 1;
    postIds = postIds || [];
    
    return getRecentlyEditedPostEvents(pageNumber)
        .then(function (results) {
            postIds = postIds.concat(results.items
                .filter(function (item) {
                    return item.event_type === "post_edited";
                }).map(function (item) {
                    return item.event_id;
                }));
            
            if (results.has_more) {
                // We set a timeout here to make sure we don't violate the backoff value if it is returned in the results.
                // Having backoff set means the application must not make the same request for that number of seconds.
                // https://api.stackexchange.com/docs/throttle
                //setTimeout(function () {
                    // recursively call to get around annoying promises in loops
                    return getAllRecentlyEditedPostEvents(postIds, pageNumber + 1);
                //}, results.backoff * 1000);
            } else {
                return postIds.join(";");
            }
        });
}

function getRecentlyEditedPostEvents(pageNumber) {
    var pageSize = 100;
    
    // This value represents the fields we want to get back from this query.
    // These are immutable and safe to hard code: https://api.stackexchange.com/docs/filters
    var filter = "!9YdnSOd9y";
    
    var eventsPath = `events?page=${pageNumber}&pagesize=${pageSize}&site=stackoverflow&filter=${filter}`;
    var url = baseUrl + eventsPath;
    
    return new Promise(function (resolve, reject) {
        queryStackExchangeApi(url)
            .then(function (results) {
                resolve(results);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function queryStackExchangeApi(url) {
    
    // This is not a secret value.
    var key = "cqqgtR6JWKsaLYQN2N6))Q((";
    
    // Store our access token in an environment variable.
    var accessToken = process.env.STACK_ACCESS_TOKEN;
    
    url += `&key=${key}&access_token=${accessToken}`;
    
    return new Promise(function (resolve, reject) {
        // https://gist.github.com/ORESoftware/9d27e3ed392e2eefb123
        //console.log(`Querying ${url}`);
        return getGzipped(url, function (err, data) {
            if (err) {
                reject(Error(err && err.error_message));
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
    
    function getGzipped(url, callback) {
        // buffer to store the streamed decompression
        var buffer = [];
    
        https.get(url, function (res) {
            // pipe the response into the gunzip to decompress
            var gunzip = zlib.createGunzip();
            res.pipe(gunzip);
    
            gunzip.on('data', function (data) {
                // decompression chunk ready, add it to the buffer
                buffer.push(data.toString());
    
            }).on("end", function () {
                // response and decompression complete, join the buffer and return
                callback(null, buffer.join(""));
    
            }).on("error", function (e) {
                callback(e);
            });
        }).on('error', function (e) {
            callback(e);
        });
    }
}

var stackApi = {
    getAllRecentlyEditedPosts: getAllRecentlyEditedPosts
};

module.exports = stackApi;

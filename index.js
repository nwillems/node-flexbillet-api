var https = require('https');
var url_format = require('url').format;
var path_join = require('path').join;
var extend = require('util')._extend;

function request(options, callback){
    var req = https.request(options, function(res){
        var statusCode = res.statusCode;
        if(statusCode >= 200 && statusCode < 300){
            var data = "";
            res.on('data', function(d){
                data += d;
            });
            res.on('end', function(){
                var result = JSON.parse(data); 
                callback(null, result);
            });
        }else{
            callback({ statusCode: statusCode, error: res }, null);
        }
    });
    req.on('error', function(err){
        callback(err);
    })
    req.end();
    return req;
}

function constructURL(config, path, qs){
    var url = {
        pathname: path_join("/organizerservices/api/v1", path),
        query: {
            'format': 'json',
            'localekey': 'en'
        }
    };
    if(config){
        url.query['passphrase'] = config.passphrase;
        url.query['organizerkey'] = config.organizerKey;
    }
    if(qs){
        var qq = url.query;
        url.query = extend(qq, qs);
    }

    return url_format(url);
}

function FlexAPI(config){
    if(!(this instanceof FlexAPI)) return new FlexAPI(config);

    this.config = config;
    this.basePath = "/organizerservices/api/v1";

    this.defaultRequest = {
        hostname : "flexbillet.dk",
        port : 443,
        method : "GET"
    };
}

/**
 * Simple endpoint to test "availability"
 * 
 * Args:
 *  cb - Callback of (err, res)
 */
FlexAPI.prototype.hello = function(cb){
    var apiPath = constructURL(null, "/hello");

    var options = extend(this.defaultRequest, { path: apiPath })
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res)
    });
}

/**
 * Get basic details
 * 
 * Args:
 *  cb - Callback of (err, res)
 * Result:
 *  ```{
 *      'herp: 'derp'
 *  }```
 */
FlexAPI.prototype.basics= function(cb){
    var apiPath = constructURL(this.config, "/basics");
    
    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

/**
 * Get basic details about organizer
 * 
 * Args:
 *  cb - Callback of (err, res)
 * Result:
 *  ```{
 *      'herp: 'derp'
 *  }```
 */
FlexAPI.prototype.organizerdetails = function(cb){
    var apiPath = constructURL(this.config, "/organizerdetails");
    
    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}


/**
 * Get list of events
 *
 * Args:
 *  args - Argument object, details below.
 *  cb - Callback of (err,res)
 *
 * Args-object:
 * {
 *  include-private-events : boolean,
 *  include-test-events : boolean, 
 *  changedsincedatetime : milliseconds,
 *  include-for-departments : boolean
 * }
 */
FlexAPI.prototype.eventlist = function(args, cb){
    if(!cb && typeof(args) == 'function') cb = args;

    var apiPath = constructURL(this.config, "/eventlist");
    
    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

/**
 * Get details for a given event
 *
 * Args:
 *  opts - object holding eventkey and secret
 *  args - Argument object, details below.
 *  cb - Callback of (err,res)
 *
 * Args-object:
 * {
 *  include-private-events : boolean,
 *  include-test-events : boolean, 
 *  changedsincedatetime : milliseconds,
 *  include-for-departments : boolean
 * }
 */
FlexAPI.prototype.eventdetails = function(opts, cb){
    var apiPath = constructURL(this.config, "/eventdetails", 
            {'eventkey': opts.eventkey, 'secret': opts.secret });
    
    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

module.exports = FlexAPI; 

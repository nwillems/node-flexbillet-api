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
                callback(undefined, result);
            });
        }else{
            callback(
                new Error("Request failed with: " + statusCode),
                undefined
            );
        }
    });
    req.on('error', function(err){
        callback(err, undefined);
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
 * Get a list of departments
 *
 * Args:
 *  cb - Callback of (err, res)
 */
FlexAPI.prototype.departmentlist = function(cb){
    var apiPath = constructURL(this.config, '/departmentlist');

    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

/**
 * Get a list of Role types
 *
 * Args:
 *  cb - Callback of (err, res)
 */
FlexAPI.prototype.roletypelist = function(cb){
    var apiPath = constructURL(this.config, '/roletypelist');

    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

/**
 * Get a list of staff for organizer/department
 * Consider renaming to "stafflist"
 *
 * Args:
 *  opts - Options object
 *  cb - callback of cb,err)
 *
 *  Opts-object:
 *  {
 *    roletypes: String (roletypekey separated by comma)
 *  }
 */
FlexAPI.prototype.stafflistcontext = function(opts, cb){
    if(typeof(opts) === 'function') {
        cb = opts;
        opts = undefined;
    }

    var roles = opts || {};
    var apiPath = constructURL(this.config, '/stafflistcontext', roles);

    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

/**
 * Get a list of staff for organizer including departments
 * Consider renaming to "stafflist"
 *
 * Args:
 *  opts - Options object
 *  cb - callback of cb,err)
 *
 *  Opts-object:
 *  {
 *    roletypes: String (roletypekey separated by comma)
 *  }
 */
FlexAPI.prototype.stafflistorganizer = function(opts, cb){
    if(typeof(opts) === 'function') {
        cb = opts;
        opts = undefined;
    }

    var roles = opts || {};
    var apiPath = constructURL(this.config, '/stafflistorganizer', roles);

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
    if(!cb && typeof(args) == 'function'){
        cb = args;
        args = {};
    }

    var urlArgs = {}
    var params = [
        'include-private-events', 
        'include-test-events',
        'changedsincedatetime',
        'include-for-departments' ];
    params.forEach(function(elm){
        if(args[elm])
            realArgs[elm] = args[elm];
    });

    var apiPath = constructURL(this.config, "/eventlist", urlArgs);
    
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
 *  eventkey - event identifier
 *  eventsecret - Secret for event
 *  args - Argument object, details below.
 *  cb - Callback of (err,res)
 *
 */
FlexAPI.prototype.eventdetails = function(eventkey, eventsecret, cb){
    var apiPath = constructURL(this.config, "/eventdetails", 
            {'eventkey': eventkey, 'secret': eventsecret });
   
    var options = extend(this.defaultRequest, { path: apiPath });
    var req = request(options, function(err, res){
        if(err){ return cb(err); }

        cb(null, res);
    });
    return req;
}

module.exports = FlexAPI; 

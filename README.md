# Flexbillet-api for node
Wrapper for flexbillet API in node

Install: 
```shell
$ npm install flexbillet-api
```

## Usage

Basic testing out the API
```javascript
var flex = require("flexbillet-api")(null);

flex.hello(function(err, res){
    if(err) return done(err);
    
    console.log(res.result.message);
});
```

Getting a list of your events:

```javascript
var config = {
    "organizerKey": "your-organizer-name",
    "passphrase" : "The-one-you-obtained-from-admin",
    "localekey": "da"
};
var flex = require("flexbillet-api")(config);

flex.eventlist(function(err, res){
    if(err) return done(err);

    console.log(res['event-list']);
});
```

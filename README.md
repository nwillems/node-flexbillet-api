# Flexbillet-api for node
Wrapper for flexbillet API in node

Install: 
```shell
$ npm install flexbillet-api
```

## Usage

Basic testing connectivity to the API
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

    console.log(res["event-list"]);
});
```

## Methods

### hello
...

### Basic Details
`flex.basics(cb)`

Returns
```JSON
{ "basic-details": { 
   "site-skin-url": "string",
   "environment-appspot-host": "string"
} }

```

### Organizer Details
`flex.organizerdetails(cb)`

Returns:
```JSON
{ "organizer-details": { 
    "organizer-key": "String",
    "organizer-name": "String",
    "locale-key": "da",
    "organizer-email": "String-Email",
    "organizer-phone": "",
    "organizer-web": "",
    "front-page-content": "String-HTML",
    "header-text": "",
    "header-text-color": "#000000",
    "header-text-size": "20",
    "header-text-weight-style": "NORMAL",
    "header-text-x-offset": "0",
    "header-text-y-offset": "0",
    "header-text-alignment": "LEFT",
    "site-skin-url": "Url",
    "primary-site": "t",
    "site-layout": "Boxed",
    "member-system": "false",
    "social-image-url": "",
    "meta-description": "",
    "robots-behavior": "NotAllowed"
} }
```

### Department list for Organizer
TODO

### RoleType List for Organizer
TODO

### Staff List for Organizer/Department
TODO

### Staff List for Organizer
TODO

### Event List

### Event Details

### Ticket List for Event
TODO

### Scanned Tickets for Event
TODO

### Event Tab List
TODO

### Event Tag List
TODO

### Report List
TODO

### Generate Report Output
TODO

### Generate Membershipcard Output
TODO

### Generate Ticket preview
TODO

### Generate Teamlist Output
TODO

### Scanned Membership barcode
TODO

### Search Purchase/Ticket data
TODO

### Department Invite details
TODO

### Membersystem data
TODO

### Create team-member
TODO


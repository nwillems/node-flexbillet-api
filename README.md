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
`flex.hello(cb)`

Returns(Note: time will change)
```JSON
{ "result": {
    "message": "Hello there, the api is working. Now: 2016-02-14 22:23"
} }

```

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

### Event List
`flex.eventlist([args,] cb)`

```
args = {
    "include-private-events": boolean, // if true, private events will be in the list returned (only if using systempassphrase)
    "include-test-events": boolean, // if true, test events will be in the list returned
    "changedsince": datetime milliseconds, //events changed since given datetime is returned.
    "include-for-departments": boolean //if true events for departments are returned.
}
```

Returns(Some of these are the actual values - others are "specifications"):
```JSON
{ "event-list": {
    "event-list-details": [ {
        "organizer-key": "String",
        "event-key": "String",
        "event-name": "String",
        "state-key": "PublishedMode",
        "event-start": "Date(YYYY-MM-DD hh:mm)",
        "event-type": "EVENT",
        "secret": "",
        "event-description": "String-HTML",
        "event-short-description": "TestEvent",
        "paid-event": true,
        "free-event": false,
        "open-for-registration": false,
        "booking-return-target": "EventDetails",
        "registration-start": "Date(YYY-MM-DD hh:mm)",
        "registration-end": "Date(YYY-MM-DD hh:mm)",
        "event-end": "",
        "max-available-tickets": 0,
        "max-tickets-per-customer": 0,
        "public": true,
        "logo-url": "String-url",
        "flyer-url": "String-url",
        "social-image-url": "",
        "event-tags": "",
        "short-title": "String",
        "display-registered-participants": false,
        "show-social-widgets": false,
        "visible-from": "Date(YYY-MM-DD hh:mm)",
        "visible-to": "Date(YYY-MM-DD hh:mm)",
        "button-more-label": "",
        "button-register-label": "",
        "sold-out-label": "",
        "location": {
            "name": "",
            "description": "",
            "address": "",
            "geo-location": "",
            "logo-url": "",
            "streetaddress1": "",
            "streetaddress2": "",
            "zipcode": "",
            "city": "",
            "country": "" },
        "account": {
            "minimum-price-to-pay": 0,
            "fixed-price": false,
            "currency-code": "",
            "short-price-description": "",
            "rich-price-description": "" },
        "participant-designation-list": { "participant-designation": "Object" },
        "custom-property-list": { "custom-property": [] },
        "event-price-info-list": { "event-price-info": [] },
        "resource-type-list": { "resource-type": "Object" }
    } ]
} }
```

### Event Details

### TODO
* Department list for Organizer
* RoleType List for Organizer
* Staff List for Organizer/Department
* Staff List for Organizer
* Ticket List for Event
* Scanned Tickets for Event
* Event Tab List
* Event Tag List
* Report List
* Generate Report Output
* Generate Membershipcard Output
* Generate Ticket preview
* Generate Teamlist Output
* Scanned Membership barcode
* Search Purchase/Ticket data
* Department Invite details
* Membersystem data
* Create team-member


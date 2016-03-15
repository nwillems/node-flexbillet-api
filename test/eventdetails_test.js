var assert = require('assert')
  , expect = require('expect.js')
  , nock = require('nock');

var config = require('./fixture.json'); 

describe("Event details endpoints", function(){
    it("should respond with event details", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/eventdetails")
            .query({ 
                format: 'json', 
                localekey: 'en',
                passphrase: config.passphrase,
                organizerkey: config.organizerKey,
                secret: 'eventsecret',
                eventkey: '12345678'
            }).reply(200, { "event-details": {} });

        var flex = require("../")(config);

        var eventkey = "12345678";
        flex.eventdetails(eventkey, 'eventsecret', function(err, res){
            if(err) return done(err);

            expect(res).to.have.property("event-details");
            //TODO: Fix more asserts
            done();
        });
    });
});

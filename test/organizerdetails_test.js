var assert = require('assert')
  , expect = require('expect.js')
  , nock = require('nock');

var config = require('./fixture.json' );

describe("Organizer details endpoints", function(){
    it("should respond with simple message", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/organizerdetails")
            .query({ 
                format: 'json', 
                localekey: 'en',
                passphrase: config.passphrase,
                organizerkey: config.organizerKey })
            .reply(200, {
                "organizer-details": {
                    "message":"Hello there, the api is working. Now: 2016-02-16 17:25"
                }
            });

        var flex = require("../")(config);

        flex.organizerdetails(function(err, res){
            if(err) return done(err);

            expect(res).to.have.property("organizer-details");
            done();
        })
    });
});


var assert = require('assert');
var expect = require('expect.js');
var nock = require('nock');

var config = require('./fixture.json' );

describe("Basic details endpoints", function(){
    it("should respond with simple message", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/basics")
            .query({ 
                format: 'json', 
                localekey: 'en',
                passphrase: config.passphrase,
                organizerkey: config.organizerKey })
            .reply(200, {
                "basic-details": {
                    "message":"Hello there, the api is working. Now: 2016-02-16 17:25"
                }
            });

       var flex = require("../")(config);

        flex.basics(function(err, res){
            if(err) {
                console.log(err);
                return done(err);
            }

            expect(res).to.have.property("basic-details");
            done();
        })
    });
});

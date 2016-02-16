
var assert = require('assert');
var expect = require('expect.js');
var nock = require('nock');

var config = {
    organizerKey : 'test',
    passphrase : 'testie'
}

describe("Basic endpoints", function(){
    it("loads", function(){
        var flex = require("../");

        expect(flex).to.be.a('function');
    });

    it("should respond with simple message", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/hello")
            .query({ format: 'json', localekey: 'en' })
            .reply(200, {
                "result": {
                    "message":"Hello there, the api is working. Now: 2016-02-16 17:25"
                }
            });

        var flex = require("../")(null);

        flex.hello(function(err, res){
            expect(err).to.be(null);
            expect(res).to.have.property("result");
            expect(res.result).to.have.property("message");
            done();
        });
    });

    it("should propagate errors", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/hello")
            .query({ format: 'json', localekey: 'en' })
            .replyWithError(new Error());

        var flex = require("../")(null);

        flex.hello(function(err, res){
            expect(res).to.be(undefined);
            expect(err).to.an(Error);
            done();
        });
    });

    it("should error on status < 200", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/hello")
            .query({ format: 'json', localekey: 'en' })
            .reply(199, {});

        var flex = require("../")(null);

        flex.hello(function(err, res){
            expect(res).to.be(undefined);
            expect(err).to.an(Error);
            done();
        });
    });

    it("should error on status > 299", function(done){
        var scope = nock("https://flexbillet.dk")
            .get("/organizerservices/api/v1/hello")
            .query({ format: 'json', localekey: 'en' })
            .reply(418, {});

        var flex = require("../")(null);

        flex.hello(function(err, res){
            expect(res).to.be(undefined);
            expect(err).to.an(Error);
            done();
        });
    });
});

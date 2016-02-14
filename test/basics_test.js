
var assert = require('assert');
var expect = require('expect.js');

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
        var flex = require("../")(null);

        flex.hello(function(err, res){
            if(err) return done(err);

            expect(res).to.have.property("result");
            expect(res.result).to.have.property("message");
            expect(res.result.message).to.be.a('string');
            expect(res.result.message).to.contain('Hello there');
            done();
        })
    });
});

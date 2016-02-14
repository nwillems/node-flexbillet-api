
var assert = require('assert');
var expect = require('expect.js');

var config = require('./fixture.json' );

describe("Basic details endpoints", function(){
    it("should respond with simple message", function(done){
        var flex = require("../")(config);

        flex.basics(function(err, res){
            if(err) return done(err);

            expect(res).to.have.property("basic-details");
            done();
        })
    });
});

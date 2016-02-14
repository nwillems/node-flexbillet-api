var assert = require('assert');
var expect = require('expect.js');

var config = require('./fixture.json'); 

describe("Eventlist endpoints", function(){
    it("should respond with list of events", function(done){
        var flex = require("../")(config);

        flex.eventlist(function(err, res){
            if(err) return done(err);

            expect(res).to.have.property("event-list");
            //TODO: Fix more asserts
            done();
        });
    });
});

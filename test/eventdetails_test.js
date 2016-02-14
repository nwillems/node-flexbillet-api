var assert = require('assert');
var expect = require('expect.js');

var config = require('./fixture.json'); 

describe("Event details endpoints", function(){
    it("should respond with event details", function(done){
        var flex = require("../")(config);

        var eventkey = "17514552291073775c992331aed42afb080a97dddea347a8";
        flex.eventdetails({'eventkey': eventkey, 'secret': ''}, 
            function(err, res){
                if(err) return done(err);

                expect(res).to.have.property("event-details");
                //TODO: Fix more asserts
                done();
            }
        );
    });
});

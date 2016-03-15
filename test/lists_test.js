var assert = require('assert')
  , expect = require('expect.js')
  , nock = require('nock');

var config = require('./fixture.json'); 

function quickNock(url_path, qparam, response){
    if (!response){
        response = qparam;
        qparam = {};
    }
    var extend = require('util')._extend;
    var query = extend(qparam, { 
            format: 'json', 
            localekey: 'en',
            organizerkey: config.organizerKey,
            passphrase: config.passphrase
        }); 
    return nock("https://flexbillet.dk")
        .get(url_path)
        .query(query).reply(200, response);
}

describe("List endpoints", function() {
    describe("Eventlist endpoints", function() {
        it("should respond with list of events", function(done) {
            var scope = quickNock("/organizerservices/api/v1/eventlist", 
                    { "event-list":{} });

            var flex = require("../")(config);

            flex.eventlist(function(err, res){
                if(err) return done(err);

                expect(res).to.have.property("event-list");
                //TODO: Fix more asserts
                done();
            });
        });
    });

    describe("Departmentlist", function() {
        it("should call through to url", function(done) {
            var scope = quickNock("/organizerservices/api/v1/departmentlist", {});

            var flex = require('../')(config);

            flex.departmentlist(done);
        });
    });

    describe("Roletypelist", function(){
        it("should call through", function(done) {
            var scope = quickNock("/organizerservices/api/v1/roletypelist", {});

            var flex = require('../')(config);
            flex.roletypelist(done);
        });
    });

    describe("Stafflistcontext", function(){
        it("should call through", function(done) {
            var scope = quickNock("/organizerservices/api/v1/stafflistcontext", {});

            var flex = require('../')(config);
            flex.stafflistcontext(done);
        });

        it("should handle opts also", function(done) {
            var scope = quickNock("/organizerservices/api/v1/stafflistcontext", {roletypes: "admin"} , {});

            var flex = require('../')(config);
            flex.stafflistcontext({roletypes: "admin"}, done);
        });
    });

    describe("Stafflistorganizer", function(){
        it("should call through", function(done) {
            var scope = quickNock("/organizerservices/api/v1/stafflistorganizer", {});

            var flex = require('../')(config);
            flex.stafflistorganizer(done);
        });
        
        it("should handle opts also", function(done) {
            var scope = quickNock("/organizerservices/api/v1/stafflistorganizer", {roletypes: "admin"} , {});

            var flex = require('../')(config);
            flex.stafflistorganizer({roletypes: "admin"}, done);
        });
    });
});

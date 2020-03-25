const supertest = require("supertest");
const app = "localhost:3000";

describe("GET /", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});
const supertest = require("supertest");
const app = "localhost:3000";

describe("Route integration", () => {
  describe("/auth", () => {

    describe("GET", () => {
      it("responds with 200 status", () => {
        return supertest(app)
          .get("/auth/test")
          .expect(200)
      });
    });

  });

  describe("/login", () => {

    describe("POST", () => {
      it("responds with 200 status and expect username to be username", async () => {
        const res = await supertest(app)
          .post("/auth/login")
          .send({
            username: 'jordan',
            password: 'kelly'
          });
          expect(res.statusCode).toEqual(200)
          expect(res.body.username).toBe('jordan')
      });
    });
    
  });

  xdescribe("/register", () => {

    describe("POST", () => {
      it("responds with 200 status and expect text to be successful", async () => {
        const res = await supertest(app)
          .post("/auth/register")
          .send({
            username: '8',
            password: 'stacks'
          });

          expect(res.statusCode).toEqual(200)
          expect(res.text).toBe('Successfully added to database')
      });
    });
    
  });

});

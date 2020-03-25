const supertest = require("supertest");
const app = "localhost:3000";

describe("Route integration", () => {
  describe("/", () => {

    describe("GET", () => {
      it("responds with 200 status", () => {
        return supertest(app)
          .get("/")
          .expect(200)
      });
    });

  });

  describe("/login", () => {

    describe("POST", () => {
      it("responds with 200 status", async () => {
        const res = await supertest(app)
          .post("/login")
          .send({
            username: 'jordan',
            password: 'kelly'
          });
          expect(res.statusCode).toEqual(200)
          expect(res.body).toBe('Successful login')
      });
    });
    
  });

  xdescribe("/register", () => {

    describe("POST", () => {
      it("responds with 200 status", async () => {
        const res = await supertest(app)
          .post("/register")
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

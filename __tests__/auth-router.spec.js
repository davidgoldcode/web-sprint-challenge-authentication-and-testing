const supertest = require("supertest");
const server = require("../api/server.js");

describe("Tests for our Auth Router", () => {
  describe("Tests for /register POST", () => {
    it("should return 200 OK", () => {
      const fakeUser = {
        username: `User${Math.random() * 200}`,
        password: `Password${Math.random() * 200}`,
      };
      return supertest(server)
        .post("/api/auth/register")
        .send(fakeUser)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return 200 OK", () => {
      const fakeUser = {
        username: `User${Math.random() * 200}`,
        password: `Password${Math.random() * 200}`,
      };
      return supertest(server)
        .post("/api/auth/register")
        .send(fakeUser)
        .then((res) => {
          expect(res.body.data.username).toBe(fakeUser.username);
        });
    });
  });

  describe("Tests for /login POST", () => {
    const credentials = {
      username: "dg",
      password: "dg123",
    };

    it('should return "welcome" in the body', () => {
      return supertest(server)
        .post("/api/auth/login")
        .send(credentials)
        .then((res) => {
          expect(res.body.message).toMatch(/welcome!/gi);
        });
    });

    it("should return a json", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send(credentials)
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});

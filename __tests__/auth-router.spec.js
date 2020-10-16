const supertest = require("supertest");
const server = require("../api/server.js");
const session = require("supertest-session");

describe("Tests for our Auth Router", () => {
  beforeEach(() => (testSession = session(server)));

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

  describe("test for /joke GET request", () => {
    const credentials = {
      username: "dg",
      password: "dg123",
    };

    it("should return 200 OK", () => {
      return testSession
        .post("/api/auth/login")
        .send(credentials)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return 401 with wrong credentials", () => {
      return testSession
        .post("/api/auth/login")
        .send({
          username: "fake",
          password: "notreal",
        })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const connection = require("../database/dbConfig");
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

const sessionConfiguration = {
  name: "Chocolate Chip",
  secret: process.env.SESSION_SECRET || "big secret",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
    secure: process.env.SECURE_COOKIES || false,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: connection,
    tablename: "sessions",
    sidfieldname: "sid",
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfiguration));

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

module.exports = server;

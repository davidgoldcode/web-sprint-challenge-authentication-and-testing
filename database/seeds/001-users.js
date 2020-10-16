exports.seed = function (knex) {
  const users = [
    { username: "David", password: "pw" },
    { username: "Beau", password: "pass" },
    { username: "Leo", password: "password" },
  ];
  return knex("users").insert(users);
};

const db = require("../database/dbConfig");

module.exports = {
  findBy,
  getAll,
  findById,
  insert,
};

function getAll() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function insert(details) {
  try {
    const [id] = await db("users").insert(details, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

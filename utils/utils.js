const fs = require("fs");

const parserClients = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const addClient = (usersData, path) =>
  fs.writeFileSync(path, JSON.stringify(usersData));

const updateClient = (userDtata, path) =>
  fs.writeFileSync(path, JSON.stringify(userDtata));

  module.exports = { addClient, parserClients, updateClient };

var database = require("../database/config");

function listar() {
    var query = `select * from curso`;
  
    return database.executar(query);
  }

module.exports = {
    listar
};
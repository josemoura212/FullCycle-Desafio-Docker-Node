const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "1524",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

const create_table = `create table if not exists people(id int not null auto_increment primary key, name varchar(255))`;
connection.query(create_table);

function insertName() {
  var names = [
    "Jose",
    "Wesley",
    "Geovanna",
    "Carlos",
    "Edson",
    "Thais",
    "Safira",
    "Oliver",
    "Hanna",
    "Mariza",
    "Eleida",
  ];

  var name = names[Math.floor(names.length * Math.random())];
  return new Promise((resolve, reject) => {
    connection.query(`insert into people(name) values('${name}')`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function getNames() {
  return new Promise((resolve, reject) => {
    connection.query("select name from people", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.get("/", (req, res) => {
  insertName();
  getNames().then((names) => {
    const namesList = names.map((name) => `<li>${name.name}</li>`).join("");
    res.send(`<h1>Full Cycle</hjson><ul>${namesList}</ul>`);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});

connection.end();

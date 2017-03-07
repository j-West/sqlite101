'use strict';

const { Database } = require('sqlite3').verbose();


// Create a database that is saved on disk.
const db = new Database('company.sqlite');


//Function for error handling
const errorHandler = (err) => {
  if (err) {
    console.log(`Msg: ${err}`);
  };
};


//Function to drop employees table
const dropEmployees = () => {
  db.run(`DROP TABLE employees`)
};
// dropEmployees();


// Create a table titled employees with the following columns: id, firstName, lastName, jobTitle, address
db.run('CREATE TABLE IF NOT EXISTS employees (employee_id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT, salary NUM)', errorHandler);


// Create an array of at least 6 objects. Each object should have a key value pair matching each column name in the employees table.
let employees = [
  { employee_id : 1, firstName : 'Joel', lastName : 'Legg', jobTitle : 'CEO', address : '500 Broadway', salary: 100000.00},
  { employee_id : 2, firstName : 'Billy', lastName : 'Connoly', jobTitle : 'CTO', address : '123 SeaSide', salary: 10000.00},
  { employee_id : 3, firstName : 'Michael', lastName : 'Tambo', jobTitle : 'COO', address : ' 012 Singing', salary: 1000.00},
  { employee_id : 4, firstName : 'Jared', lastName : 'Fuller', jobTitle : 'CIO', address : '500 Interstate BLVD', salary: 100.00},
  { employee_id : 5, firstName : 'Luke', lastName : 'Woodward', jobTitle : 'Jr Jobs', address : 'Apple HQ', salary: 10.00},
  { employee_id : 6, firstName : 'Scott', lastName : 'Humphries', jobTitle : 'Relaxing', address : 'Nashville', salary: 1.00}
];



// Insert each of the employee objects into the database.
employees.forEach(({ employee_id, firstName, lastName, jobTitle, address, salary }) => {
  db.run(`INSERT INTO employees VALUES (
    ${employee_id}, "${firstName}", "${lastName}", "${jobTitle}", "${address}", ${salary})`, errorHandler);
});


// Write a statement to query the database and console.log() all employee records.
db.all(`SELECT * FROM employees`, (err, rows) => {
  errorHandler(err);
  rows.forEach(({ employee_id, firstName, lastName, jobTitle, address }) => {
    console.log(`ID: ${employee_id}, Name: ${firstName} ${lastName}, Job: ${jobTitle}, Address: ${address}`);
  })
})


// Write a statement to query the database and console.log() each employees jobTitle.
db.each(`SELECT jobTitle FROM employees`, (err, { jobTitle }) => {
  errorHandler(err);
  console.log(jobTitle)
})


// Write a statement to query the database and console.log() each employees firstName, lastName and address only.
db.each(`SELECT firstName, lastName, address FROM employees`, (err, { firstName, lastName, address }) => {
  errorHandler(err);
  console.log(`Name: ${firstName} ${lastName}, Address: ${address}`);
})


// Write a statement that returns all employees of a certain jobTitle.
db.all(`SELECT * FROM employees WHERE jobTitle = "CEO" GROUP BY jobTitle`, (err, allRows) => {
  allRows.forEach(({ employee_id, firstName, lastName, jobTitle, address, salary }) => {
      console.log(`Job Title: ${jobTitle}, Name: ${firstName} ${lastName}, ID: ${employee_id}, Address: ${address}, Salary: ${salary}`);
  });
});

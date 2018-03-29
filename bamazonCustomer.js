const mysql = require("mysql");
require('dotenv').config();
const inquirer = require("inquirer");
require("console.table");

// Connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "bamazon"
});

// Establishes connection
connection.connect((err) => {
  err ? console.log(err) :
  console.log("connected as id " + connection.threadId);
  loadProducts();
});


// Function to load Products
const loadProducts = () => {

  // Selecting all data from products
  connection.query("SELECT * FROM products", (err, res) => {
    err ? console.log(err) :

    // Renders a table in Terminal
    console.table(res);

    // Prompt User for item
    promptCustomerForItem(res);
  }

);}

// Customer is prompted for a product ID
const promptCustomerForItem = (inventory) =>{
  inquirer
  .prompt([
    {
        type: "input",
        name: "choice",
        message: "Please enter the 'ID' of the product you would like to purchase... type 'X' to exit",
        validate: (val) => {
          // Validation and defensive for user
          !isNaN(val) || val.toLowerCase() === "x";
      }
    }
  ])
  .then( (val) => {
    checkIfShouldExit(val.choice);
    let choiceId = parseInt(val.choice);
    let product = checkInventory(choiceId, inventory);

    // If there is a product with the id the user chose, prompt the customer for a desired quantity
    product ?
      // Pass the chosen product to promptCustomerForQuantity
      promptCustomerForQuantity(product)
    :
      // Otherwise let them know the item is not in the inventory, re-run loadProducts
      console.log("\nI don't seem to have that in stock... Sorry!");
      loadProducts();
    });
}

// If User wants to Exit
const checkIfShouldExit = (choice) =>
choice.toLowerCase() === "x"
// Log a message and exit the current node process
console.log("Closing Bamazon...");
process.exit(0);

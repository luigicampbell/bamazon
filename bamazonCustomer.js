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
const promptCustomerForItem = (inventory) => {
  inquirer
  .prompt([
    {
      type: "input",
      name: "choice",
      message: "Please enter the 'ID' of the product you would like to purchase or type 'X' to exit...\n Waiting for User Input...",
      validate: (val) => {
        // Validation and defensive for user
        return !isNaN(val) || val.toLowerCase() === "x";
      }
    }
  ])
  .then((val) => {
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

// Prompt customer for quantity of product
const promptCustomerForQuantity = (product) => {
  inquirer
  .prompt([
    {
      type: "input",
      name: "quantity",
      message: "Enter the quantity you would like to purchase or type 'X' to exit... \n Waiting for User Input...",
      validate: (val) => {
        // Validation and defensive for user
        return val > 0 || val.toLowerCase() === "x";
      }
    }
  ])
  .then((val) => {
    // checkIfShouldExit(val.quantity);
    let quantity = parseInt(val.quantity);
    if (quantity > product.stock_quantity)
    {
      console.log("\nInsufficient quantity!");
      loadProducts();
    } else makePurchase(product, quantity);
  });
}

// Check to see if the product the user chose exists in the inventory
const checkInventory = (choiceId, inventory) => {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// Purchase the desired quanity of the desired item
const makePurchase = (product, quantity) => {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    (err, res) => {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// If User wants to Exit
const checkIfShouldExit = (choice) =>
{
  if(choice.toLowerCase() === "x"){
    // Log a message and exit the current node process
    console.log("Closing Bamazon...");
    process.exit(0);
  }

}

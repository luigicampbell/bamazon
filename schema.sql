-- DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- Makes a numeric column which cannot contain null --
  product_name VARCHAR(90) NOT NULL,
  -- Makes a string column which cannot contain null --
  department_name VARCHAR(50),
  -- Makes a sting column --
  price DECIMAL(20,2),
  -- Makes a numeric column called "pet_age" --
  stock_quantity INTEGER(99),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Brime Bideo Bubscription", "Bamazon Bideo", 29.99, 999),("Tesla Roadster (Battery Not Included)", "Bautomotive", 200000, 2),("Quantum Difibrillator", "Bumputers", 999999, 1),("Stem Cells", "Bealth & Beauty", 125000, 25),("Wacbook Bro", "Bumputers", 1999.99, 90),("Michael Kors Human Leather Purse", "Bapparel & Bashion", 179.99, 25),("Binal Bantasy BII", "Bideo Games", 69.99, 77),("Battlers of Batan", "Board Games", 49.99, 15),("Bandai Gundam (PTSD enabled)", "Billitary R & B", 727910000.79, 1),("Buscle Bulk Brotein Powder", "Bealth & Bitness", 49.99, 20);

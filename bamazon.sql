DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("YBox 720 Gaming Console" , "Electronics" , 549 , 6),
	   ("Bamazon Becho Personal Assistant" , "Electronics" , 99, 2),
	   ("Boise Noise-Cancelling Headphones" , "Electronics" , 199 , 8),
       ("Sumsang Solar System 7 Smartphone" , "Electronics" , 1299, 1),
       ("Jim Fourman Propane Grill" , "Lawn & Garden" , 89 , 4),
       ("CamelButt Hydration Pack" , "Outdoors" , 69 , 3),
       ("Uwu Lightweight Hammock" , "Outdoors" , 119, 5),
       ("Bay Rands Sunglasses" , "Fashion" , 499 , 7),
       ("Mikey Tennis Shoes" , "Fashion" , 209 , 2),
       ("Buppi Handbag" , "Fashion" , 699 , 3);
       
SELECT * FROM products;
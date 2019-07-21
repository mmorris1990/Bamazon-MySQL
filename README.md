# Bamazon - MySQL & Node.JS App
A CLI application featuring a mock storefront where users can "purchase" products.

**See it running [here](/media/bamazon_showcase.webm)**

## Tech used
- Node.JS
- MySQL
- npm modules:
    - Inquirer
    - Dotenv
    - Mysql
    - Table

## Features
- The application is run in a terminal using Node, and connects to a sql database to read and update a products table.
- Customers may purchase products from the available products in the database. 
- User input validation is present to ensure that customers cannot purchase more inventory than Bamazon has in stock.
- Inquirer provides an easy to use UI with prompts asking the user what they would like to do.
- Table organizes product, price, department, and inventory data in a concise manner within the CLI.

## How to use?

1. Run the following in your CLI while inside your cloned repo directory

		node bamazonCustomer.js

2. Select from the resulting screen whether you would like to view items or leave.
![Choose to view products or exit the app](/media/bamazon1.png)

3. If you select view items, input and enter the item id that you would like to purchase
![Select a item ID](/media/bamazon2.png)

4. Input and enter the quantity that you would like to buy
**If you select a quantity that is equal to or less than the current inventory, the sale will be a success**
![Sale Success](/media/bamazon3.png)

**If there is not enough of the product in inventory, the sale will not be completed**
![Sale Failed](/media/bamazon4.png)

5. If you would like to buy another item, repeat from step 2

6. If you would like to leave, click exit

######© M. Morris 2019
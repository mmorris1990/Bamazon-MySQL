require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
var Table = require("cli-table");

// Create connection to db
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
});

// Test connection
connection.connect(function (err) {
    if (err) throw err;
    console.log(" =================== \n Welcome to Bamazon! \n =================== \n");
    welcome();
});

function welcome() {

    // Ask customer what they'd like to do
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            choices: ["View items for sale", "Leave the store"],
            message: "Please select what you would like to do.\n"
        }
    ]).then(function (action) {

        // If user wants to view items, run rest of app
        if (action.action === "View items for sale") {
            viewItems();

            // If user wants to leave, exit app
        } else if (action.action === "Leave the store") {
            exit();
        };
    });
};

var viewItems = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Create table to display current stock
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "In Stock"]
        });
        console.log("\nHere is what we have for sale! ");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());

        // Ask customer what they'd like to buy and how much
        inquirer.prompt([
            {
                name: "id",
                message: "\nPlease enter the ID of the item that you would like to purchase.",

                // Validates that the input is an available ID number
                validate: function (value) {
                    if (value > 0 && isNaN(value) === false && value <= res.length) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "qty",
                message: "\nHow many would you like?",

                validate: function (value) {
                    if (value > 0 && isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function (transaction) {

            var itemQty;
            var itemName;
            var itemPrice;

            // Set above vars equal to results where the input id matches db id
            for (var j = 0; j < res.length; j++) {
                if (parseInt(transaction.id) === res[j].item_id) {
                    itemName = res[j].product_name;
                    itemPrice = res[j].price;
                    itemQty = res[j].stock_quantity;
                }
            }

            // If user tries to buy more qty than db has available, tell them no, run the welcome function again
            if (parseInt(transaction.qty) > itemQty) {
                console.log("\nInsufficient inventory for your requested quantity. We have "
                    + itemQty + " in stock. Try again.\n");
                welcome();
            }

            // If user tries to buy equal/less qty than db has available, tell them yes
            else if (parseInt(transaction.qty) <= itemQty) {
                console.log("\nSuccess! You purchased " + transaction.qty
                    + " of " + itemName + " for $" + itemPrice + "!\n");

                lowerQty(transaction.id, transaction.qty, itemQty, itemPrice);

                welcome();
            }
        });
    });
};

function lowerQty(item, purchaseQty, stockQty) {

    // Connect to the db and reduce stock of purchased item by amount @ ID #
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stockQty - parseInt(purchaseQty)
            },
            {
                item_id: parseInt(item)
            }
        ],

        function (err, res) {
            if (err) throw error;
        });
}

// Exit function that will close the connection to the db
function exit() {
    console.log("\nThanks for stopping by! Have a good day.");
    connection.end();
};

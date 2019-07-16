var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
const util = require('util');
const readFile = util.promisify(fs.readFile);

// Link to password file so password is not here
async function getPassword() {
    return await readFile('pass.txt', 'utf8');
    // 
    // 
};

getPassword().then(data => {
    console.log(data);
    var pass = data;
    
    // create connection to database
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: pass,
        database: "bamazon"
    });
    
    // Test connection (DELETE LATER)
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        start();
    });
    
    // Main app functionality
    function start() {
        var query = "SELECT item_id, product_name, price FROM products";
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("********************" + "\nCurrent Stock For Sale" + "\n--------------------");
            for (var i=0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + "    Item Name: " + res[i].product_name + "    Price: $" + res[i].price);
            };
            console.log("********************")
    
        })
        connection.end();
    }

});
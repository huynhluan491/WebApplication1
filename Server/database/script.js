const { json } = require("body-parser");
const fs = require("fs");

const rawData = fs.readFileSync("../data/users.json");
const userData = JSON.parse(rawDate);

let cart = [];
for (let i of userData) {
    cart.push({
        cartID: i.userID,
        userID: i.userID,
    });
}

let data = JSON.stringify(cart);
fs.writeFileSync("cart.json", data);
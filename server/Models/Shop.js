const Products = require("./Products");
class Shop{
    constructor(name,products) {
        this.name = name;
        this.products = [];
        this.products.push(new Products(1,"burger","99$"))
    }
}

module.exports = Shop;
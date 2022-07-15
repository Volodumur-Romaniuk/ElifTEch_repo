
const dbo = require('../connection');


class ShopServices{
    constructor() {
        this.db = dbo.getDb();
        this.shops = this.db.collection('All_orders')
    } 

    async setOrderOne(obj){

            await this.shops.insertOne(obj, function(err, res) {
               if (err) throw err;
                 
             });      
     }
}
module.exports = ShopServices;

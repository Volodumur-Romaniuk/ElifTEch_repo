const { ObjectId } = require('bson');
const dbo = require('../connection');
const Shop = require('../Models/Shop');

class ShopServices{
    constructor() {
        this.db = dbo.getDb();
        this.shops = this.db.collection('Shops')
    } 

    getShops(){ 
       

      return new Promise(resolve => {
          let array =[];
          this.shops.find().toArray().then((result) => {
             result.forEach(element => {
                 array.push({name:element.name})
              })
             resolve(array);
             
           })
        })
    }
    async getProducts(name){
      
        let data = await this.shops.findOne({name:name})
         data.products?.forEach(element =>{
             
         })
         return data.products  
   
     }

}
module.exports = ShopServices;

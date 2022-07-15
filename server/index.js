const express = require("express");
const PORT = process.env.PORT || 5000;
const dbo = require('./connection')
const getDataShops = require("./Controlers/getDataShops")
const ShopServices =require('./Controlers/shoppingCardsControler')
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())

dbo.connectToServer(function (err) {
    if (err) { 
      console.error(err);
      return ;
    }
  
    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  });
  app.get("/shops/:name",async (req,res) =>{  
    let name =req.params.name;
    var shopsall = new getDataShops();
    const result = await shopsall.getProducts(name);
    res.json(result);
  
  })
app.post("/order/insertone",async (req,res) =>{  
  
  let order = new ShopServices();
  console.log(req.body);
  const result = await order.setOrderOne(req.body);
  res.json(result);

})
app.get("/getdata", async(req,res) =>{
    
    var shopsall = new getDataShops();
   const result = await shopsall.getShops();
   
  res.json(result);
})
app.get("/api", (req,res)=>{
    res.json({message:"Hello from server  "});
});



       


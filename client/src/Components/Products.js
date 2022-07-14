import React,{useEffect,useState} from 'react';
import axios from "axios"
import './Products.css';

function Products({products,shopname,setLocalStorage}) {
    const [prod,setProd] = useState();

    useEffect(()=>{
        
        console.log(products)
    },[])

    const saveLocalSt = (elem) =>{

        const ob ={...elem,count:1}
        if(localStorage.getItem("Basket") === undefined ||  localStorage.getItem("Basket")=== null)
        {
            console.log(ob);

            localStorage.setItem('Basket',JSON.stringify({
                shopName:shopname,
               basket_items:[ob] 
            }))
        }
        else{
            const ls = JSON.parse(localStorage.getItem("Basket")).basket_items;
            ls.push({...elem,count:1});
            localStorage.setItem("Basket",JSON.stringify({
                shopName:shopname,
                basket_items:ls
            }))
        }
        
    }
  return (
    <div className="products">
        <div className="container">
           {
               products?.map((element)=>
                   <div className="elem-prod">
                       <div className="img">
                            <img src={element.url} alt="" />
                       </div>
                       <div className="info">
                           <div className="text">
                           <p>{element.name+"  "}</p>
                            <p>{element.price +"$"}</p>
                           </div>
                            
                            <button onClick={()=>{
                                saveLocalSt(element);
                                setLocalStorage(JSON.parse(localStorage.getItem("Basket")))
                                
                            }} value={element.id}>Add to</button>
                       </div>
                       
                   </div>
               )
           }
        </div>
    </div>
  );
}

export default Products;
/**/
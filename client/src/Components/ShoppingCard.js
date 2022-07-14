
import './ShoppingCard.css';
import React,{useEffect,useState} from 'react';
import axios from 'axios'

function ShoppingCard() {
    const [totalPrice,setTotalPrice] = useState(0);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const setOrderOne = () =>{
        
        
         axios.post(`http://localhost:5002/order/insertone`,{
             name:name,
             email:email,
             phone:phone,
             address:address,
             shopname:JSON.parse(localStorage.getItem('Basket')).shopName,
             basket_items:JSON.parse(localStorage.getItem('Basket')).basket_items
        }).then(result =>{

           console.log(result.data)
            
        })
        
    }
    const calc_total = () =>{
        let res =0;
        JSON.parse(localStorage.getItem('Basket')).basket_items.map((element,index)=>{
             res +=element.price*element.count;   
        })
        setTotalPrice(res)
    }
    useEffect(()=>{
        calc_total();
    },[])
    const find_del = (elemId) =>{
        if(JSON.parse(localStorage.getItem('Basket')).basket_items.length === 1){
            localStorage.removeItem('Basket');
            window.location= '/'
        }
       const res_ls = JSON.parse(localStorage.getItem('Basket')).basket_items.filter(element=> element.id !== elemId);
       localStorage.setItem("Basket",JSON.stringify({
        basket_items:res_ls
    }))
    }
    const find_change = (elemId,count) =>{
        console.log(count);
        const res_ls = JSON.parse(localStorage.getItem('Basket')).basket_items;
        const res_elem = res_ls.find(x=>x.id === elemId)
        console.log(res_elem.count)
        res_elem.count=count;
        console.log(res_elem)
         const res = res_ls.filter(elem=>elemId !== elem.id);
         res.push(res_elem);
         console.log(res)
         localStorage.setItem("Basket",JSON.stringify({
            basket_items:res
        }))
     
     }
  return (
    <div className="shopping-card">
      <div className="container">
          <div className="order-info">

          
          <div className="form">
            <div className="elem-form">
                <div className="elem-input">
                    <label htmlFor="">Name:</label>
                    <input type="text"  onChange={(e)=>{
                        setName(e.target.value);
                    }}/>
                </div>
                <div className="elem-input">
                    <label htmlFor="">Email:</label>
                    <input type="text" onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                </div>
                <div className="elem-input">
                    <label htmlFor="">Phone:</label>
                    <input type="text" onChange={(e)=>{
                        setPhone(e.target.value);
                    }} />
                </div>
                <div className="elem-input">
                    <label htmlFor="">Addres:</label>
                    <input type="text" onChange={(e)=>{
                        setAddress(e.target.value);
                    }} />
                </div>
            </div>
          </div>
          <div className="order">
              {
                  JSON.parse(localStorage.getItem('Basket')).basket_items.sort((x,y)=> y.price-x.price)?.map((element,index)=>
                    <div className="elem">
                       <div className="img">
                            <img src={element.url} alt="" />
                       </div>
                       <div className="text">
                            <p>{element.name}</p>
                            <p>{element.price +"$"}</p>
                       </div>
                       <div className="buttons">
                            <input type="number" id={element.id} onChange={(e)=>{
                                
                                find_change(element.id,+e.target.value)
                                calc_total();
                                console.log(e.target.value)
                            }
                            
                            }  min="1" defaultValue={element.count} />

                            <button onClick={()=>{
                                find_del(element.id)
                                calc_total();
                            }} >Del </button>
                       </div>
                       
                    </div>
                  )
              }
          </div>
          </div>
          <div className="total">
              <p>{totalPrice +"$"}</p>
              <button onClick={()=>{
                  setOrderOne();
                  localStorage.removeItem('Basket')
                  window.location = "/"
              }}>Submit</button>
          </div>
      </div>
    </div>
  );
}

export default ShoppingCard;

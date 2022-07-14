import React,{useEffect,useState} from 'react';
import axios from "axios"
import './MainPage.css';
import Products from './Products';

import {ClipLoader} from "react-spinners"
function MainPage() {
  const [shopsName,setNameShops]=useState([]);
  const [products,setProducts]=useState([]);
  const [name,setName]=useState('');
  const [localstorage,setLocalStorage] = useState(JSON.parse(localStorage.getItem("Basket")))
  const [disable,setDisable] = useState(false)
  const [shopName,setShopName] = useState('')
  const [shopDisabled,setIndexDisabled] = useState(-1)
 
  const [loading,setloading] = useState(false);

  useEffect(()=>{
    console.log("work use")
    axios.get("http://localhost:5002/getdata").then(result =>{
      setNameShops(result.data)
      console.log("getprod")
      setloading(true);
    })
  },[])

  useEffect(()=>{
    console.log("WORK");
  },[localstorage])

useEffect(()=>{
  console.log(products)
},[products])


  const getProducts = (name) =>{
    setloading(true);
    console.log("name" + name)
     axios.get(`http://localhost:5002/shops/${name}`).then(result =>{
        console.log('work-prod')
       
       console.log(result.data)
        setProducts(result.data);
        setloading(false);
    })
    
}
  return (
    <div className="mainpage">
        <div className="container">
           <div className="shops">
           {shopsName?.map((element,index)=>
              <button value={element.name} 
              onClick={(e)=>{
                getProducts(e.target.value);
                setShopName(element.name);
              }}  disabled={(localstorage === undefined ||  localstorage === null) ? false : element.name !== localstorage?.shopName ? true : false } >{element.name}</button>
           )
          }
            </div> 
            <div className="products-shops">
            {
              loading ?  
              <div className="spinner">  <ClipLoader size={150} style={{margin: "auto"}} color={"#C9AB82"}/></div>
              :<Products products = {products} setLocalStorage={setLocalStorage}  shopname={shopName}/>
            } 
            </div>
        </div>
    </div>
  );
}

export default MainPage;
/**/
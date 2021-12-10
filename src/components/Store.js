import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from "../axios/index";

function Store(props){
let [rows, setRows] = useState([]);

useEffect(() => {
	get_data();
}, []);

async function get_data(){
  try{
    let response = (await axios.get('/api/robots'));
    setRows(await response.data.data);
  }catch(err){
    console.error(err);
  }
}

function add(i){
	i.quantity=1;
	props.parentCallback("data",i);
}

function render(){
let a = "";

a = Object.entries(rows).map(([key,i])=>{
	if(rows.hasOwnProperty(key)){
		if(i && typeof(i) !== "undefined" && i !== "" && i !== []){
			if(key === "image"){
				//if(i[0].url.filter((u) => /\.(jpe?g|png|webp)$/.test(u))){
					return(<div key={key}><span className="">{key}</span><div className="col-sm-3 col-xs-12"><img src={i.image} alt="Unavailable" className="img img-thumbnail" /></div></div>);
				//}
			}else{
				return(<div key={key} className="col-sm-3 col-xs-12">
          <h4>{i.name.toString()}</h4>
          <div><img src={i.image} alt="Unavailable" className="" /></div>
          <h6>{i.price}</h6>
          <p>Stock: {i.stock}</p>
          <p>Created: {i.createdAt}</p>
          <p>Material: {i.material}</p>
          <p><button disabled={i.stock===0} className="btn btn-primary btn-sm" onClick={()=>add(i)}>Add to cart</button></p>
        </div>);
			}
		}
	}
});

return a;
}

return(
  <div className="col-md-10 row">
    <h4>Store</h4>
    {render()}
  </div>
);
}
export default Store;
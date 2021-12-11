import React, { useState, useEffect } from "react";

function Cart(props){
let [items, setItems] = useState([]);
let [totalItems, setTotalItems] = useState(0);
let [totalPrice, setTotalPrice] = useState(0.00);

useEffect(() => {
  if(props.i.image && props.i.price){
      /* checking items lenght & duplicates in item. */
      if(items.length < 5){
        if(items.includes(props.i) === false){
          setItems([...items, props.i]);
          props.parentCallback("msg_f", false);
          total_price("plus",props.i);
        }
      } else {
        props.parentCallback("msg_t", true);
      }
    }
}, [props.i]);

function total_price(o,i){
  switch(o){
		case 'plus':
      setTotalItems(prevTotalItems => prevTotalItems + 1);
      setTotalPrice(prevTotalPrice => (parseFloat(prevTotalPrice) + (parseFloat(i.price))));
		break;
    case 'minus':
      setTotalItems(prevTotalItems => prevTotalItems - 1);
      setTotalPrice(prevTotalPrice => (parseFloat(prevTotalPrice) - (parseFloat(i.price))));
		break;
    case 'remove':
      setTotalItems(prevTotalItems => prevTotalItems - i.quantity);
      let buffer = (parseFloat(i.price)) * parseInt(i.quantity);
      setTotalPrice(prevTotalPrice => (parseFloat(prevTotalPrice) - (parseFloat(buffer))));
		break;
		default:
      setTotalPrice(0.00);
	}
}

function calculate(z,i){
  switch(z){
    case 'plus':
      if(i.quantity < i.stock){
        total_price("plus",i);
        i.quantity++;
        setItems(
          items.map((item) => (
            item.name === i.name ? i : item
          ))
       );
      }
		break;
		case 'minus':
      if(i.stock > 0 && i.quantity > 0){
        i.quantity--;
        total_price("minus",i);
        setItems(
          items.map((item) => (
            item.name === i.name ? i : item
          ))
       );
      }
		break;
    case 'remove':
      let array = [...items]; // separate copy of the array
      let index = items.findIndex(x => x.name === i.name);
      if (index !== -1){
        array.splice(index, 1);
        setItems(array);
        total_price("remove",i);
        if(items.length < 6){props.parentCallback("msg_f",false);}
      }
		break;
		default:
      console.log('');
	}
}

function render(){
  if(props.i){
  let a = items.map(i=>(
    <div key={Math.random()} className="row">
      <div className="col-xs-4">
        <img src={i.image} alt={i.name}/>
      </div>
      <div className="col-xs-8">
        <p>{i.name}</p>
        <p>Amount: {i.price}</p>
        <p>Total Stock: {i.stock}</p>
        <p><button className="btn btn-primary" onClick={()=>calculate('minus',i)}>-</button> {i.quantity} <button className="btn btn-primary" onClick={()=>calculate('plus',i)}>+</button><button className="btn btn-danger" onClick={()=>calculate('remove',i)}>X</button></p>
      </div>
    </div>
  ));
  return a;}
}
return(
  <div className="col-md-2">
    <h4 className="text-center">Your cart</h4>
    <div className="alert alert-danger m-0 mb-1 p-1">Total Price: ฿{Math.abs(totalPrice).toFixed(2)}</div>
    <div className="alert alert-warning m-0 p-1">Total Items: {totalItems}</div>
    <div className="row text-center">{render()}</div>
  </div>
);
}
export default Cart;
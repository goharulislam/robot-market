import React, {useState} from "react";
import Store from '../components/Store.js';
import Cart from '../components/Cart.js';

function Home(){
let [j, setJ] = useState({});
let [msg, setMsg] = useState(false);

function component(name, i){
	switch(name){
    case 'msg_t':
      setMsg(true);
    break;
    case 'msg_f':
      setMsg(false);
    break;
		case 'data':
        setJ(i);
        if(j.hasOwnProperty(name) && j[name] === " "){console.log('')}
        else{setJ(i);}
		break;
		default:
      console.log('');
	}
}

return(
<div>
<h3 className="text-center alert alert-info" style={{borderRadius:0}}>Robot Market</h3>
<div className="container">
<div className="row">
  { msg && <p className="alert alert-danger">Cart: More than 5 items are not allowed.</p> }
  { <Store parentCallback={component} /> }
	{ <Cart i={j} parentCallback={component} /> }
</div>
</div>
</div>
);
}
export default Home;
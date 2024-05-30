import "./billComponent.css"
import React, { useState } from "react";
const BillComponent=({totalPrice, setCash})=>{
    const [balanceMoney,setBalanceMoney] = useState(0);
    
    const TotalPriceComponent=()=>{
        return (
            <div style={{display:"flex", justifyContent:"center"}}>
        <div className="total-price">
            <p className="label-text" style={{margin:"0",marginBottom:"2%"}}> Total Price</p>
            <p className="value-text" style={{margin:"0",marginBottom:"2%"}}>Rs.{totalPrice}</p>
        </div>
        </div>
        )
    }
    
    const BalanceComponent=()=>{
        return (
            <div style={{display:"flex", justifyContent:"center"}}>
        <div className="total-price">
            <p className="label-text" style={{margin:"0",marginBottom:"2%"}}> Balance</p>
            <p className="value-text" style={{margin:"0",marginBottom:"2%"}}>Rs.{balanceMoney}</p>
        </div>
        </div>
        )
    }
   const calculateBalance=(cash)=>{
        // Convert text to number
        if (!isNaN(cash)) {
            setCash(cash);
            const balance = cash-totalPrice; 
            setBalanceMoney(balance)
        } else {
          // Handle invalid input
          alert('Invalid input! Please enter a valid number.');
        }
    }
    
return (
    <div className="main-bill-container">
        <TotalPriceComponent/>
        <div style={{display:"flex", justifyContent:"center"}}>
        <div className="cash">
            <p className="label-text" style={{margin:"0",marginBottom:"2%"}}> Cash</p>
            <div style={{display:"flex",width:"20%"}}>
                <p style={{margin:"0",marginBottom:"2%",fontWeight:"bold"}}>Rs. </p>
            <input
            type="text"
            className="cash-text-field"
            placeholder="Cash"
            onChange={(e)=>{calculateBalance(Number(e.target.value))}}
          />
            </div>
        </div>
        </div>
        <BalanceComponent/>
    </div>
);
}
export default BillComponent;
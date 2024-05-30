import React, { useState } from "react";
import "./counterComponent.css"; // Import CSS file

const CounterComponent = ({
  foodName,
  menuItemID,
  price,
  singlePrice,
  quantity,
  custermizeText,
  uKey,
  setSelectedFoods,
  setTotalPrice,
}) => {
  const updateQuantityAndPrice = (newQuantity,newPrice) => {
    const updatedFood = {
      
      name: foodName,
      menuItemID:menuItemID,
      quantity: newQuantity,
      price: newPrice,
      singlePrice:singlePrice,
      custermizeText: custermizeText,
    };
    setSelectedFoods((selectedFoods) => {
      const updatedIndex = selectedFoods.findIndex(
        (food) => food.name === updatedFood.name
      );
      if (updatedIndex !== -1) {
        const updatedFoods = [...selectedFoods];
        updatedFoods[updatedIndex] = updatedFood;
        return updatedFoods;
      }
    });
  };
  
  

  const incrementCounter = () => {
    
      const newCount = quantity + 1;
      updateQuantityAndPrice(newCount,newCount*singlePrice);
      
    setTotalPrice((prevTotal) => {
      const newTotal = prevTotal + singlePrice;
      return newTotal;
    });
  };

  const decrementCounter = () => {
      const newCount = quantity === 0 ? 0 : quantity - 1;
      if (quantity <= 1) {
        setSelectedFoods((selectedFoods) => {
          console.log(uKey);
          return selectedFoods.filter((food) => food.name !== foodName);
        });
        return (quantity)
      } else {
        updateQuantityAndPrice(newCount,newCount*singlePrice);
      }
    setTotalPrice((prevTotal) => {
      const newTotal = prevTotal - singlePrice;
      return newTotal;
    });
  };

  

  return (
    <div className="counter-container" key={uKey}>
      <button
        id="decrementButton"
        className="counter-button"
        onClick={decrementCounter}
      >
        -
      </button>
      <p className="counter">{quantity}</p>
      <button
        id="incrementButton"
        className="counter-button"
        onClick={incrementCounter}
      >
        +
      </button>
    </div>
  );
};

export default CounterComponent;

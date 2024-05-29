import React, { useEffect, useState } from "react";
import "./mobileFoodOrderCounter.css"; // Import CSS file

const MobileFoodOrderCounter = ({
  menuItem,
  setNewFoodMobile,
  setSelectedFoods,
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setSelectedFoods((selectedFoods) => {
      const foundData = selectedFoods.find((food) =>
        food.name === menuItem.MenuName 
      );
      if(foundData){
        setCount(foundData.quantity);
      }else{
        setCount(0)
      }
      
      
      return selectedFoods;
    });
  }, []);

  const incrementCounter = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const newFood = {
        name: menuItem.MenuName,
        quantity: newCount,
        price: menuItem.Price * newCount,
        custermizeText: "",
        singlePrice: menuItem.Price,
        menuItemID: menuItem.MenuItemID,
      };
      setNewFoodMobile(newFood);
      return newCount;
    });
    /*setTotalPrice(prevTotal => {
        const newTotal = prevTotal + price;
        return newTotal; 
      });*/
  };

  const decrementCounter = () => {
    setCount((prevCount) => {
      const newCount = prevCount === 0 ? 0 : prevCount - 1;
      const newFood = {
        name: menuItem.MenuName,
        quantity: newCount,
        price: menuItem.Price * newCount,
        custermizeText: "",
        singlePrice: menuItem.Price,
        menuItemID: menuItem.MenuItemID,
      };
      setNewFoodMobile(newFood);
      return newCount; // Return the updated count
    });
    /*setTotalPrice(prevTotal => {
        const newTotal = prevTotal - price;
        return newTotal; 
      });*/
  };

  return (
    <div className="mobile-counter-container">
      <button
        id="decrementButton"
        className="mobile-counter-button"
        onClick={decrementCounter}
      >
        -
      </button>
      <p className="mobile-counter">{count}</p>
      <button
        id="incrementButton"
        className="mobile-counter-button"
        onClick={incrementCounter}
      >
        +
      </button>
    </div>
  );
};

export default MobileFoodOrderCounter;

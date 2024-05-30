import { useState, useEffect } from "react";
import CounterComponent from "./counterComponent";
import "./foodOrderDetails.css";
const FoodOrderDetails = ({
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
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const updateCutermizeText = (newCustermizeText) => {
    const updatedFood = {
      menuItemID:menuItemID,
      name: foodName,
      quantity: quantity,
      price: price,
      singlePrice:singlePrice,
      custermizeText: newCustermizeText,

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

  return (
    <div className="order-food-details" key={uKey}>
      <div className="sub-order-food-details">
        <CounterComponent
          foodName={foodName}
          menuItemID={menuItemID}
          quantity={quantity}
          price={price}
          singlePrice={singlePrice}
          custermizeText={custermizeText}
          uKey={uKey}
          setSelectedFoods={setSelectedFoods}
          setTotalPrice={setTotalPrice}
        />
        <div className="order-food-name">{foodName}</div>
        <div style={{ display: "flex" }}>
          <div className="order-food-price">Rs.{price}</div>
          <span
            className={`arrow ${collapsed ? "collapsed" : ""}`}
            onClick={toggleCollapse}
          >
            &#x25BC;
          </span>
        </div>
      </div>
      {!collapsed && (
        <div className="collapsible-content">
          <input
            onChange={(e) => {
              updateCutermizeText(e.target.value);
            }}
            value={custermizeText}
            type="text"
            className="food-custermizing-text-field"
            placeholder="Custermize food..."
          />
        </div>
      )}
    </div>
  );
};
export default FoodOrderDetails;

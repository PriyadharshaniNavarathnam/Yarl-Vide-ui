import React, { useEffect, useState } from "react";
import "./foodComponent.css"; // Import CSS file for styling
import MobileFoodOrderCounter from "./mobileFoodOrderCounter";
import imageUrl from "../../../assets/images/food1.jpg";

const FoodComponent = ({ menuItem, setSelectedFoods }) => {
  const [isClickable, setIsClickable] = useState(false);
  const [newFoodMobile, setNewFoodMobile] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setIsClickable(window.innerWidth > 420);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClick = () => {
    const newFood = {
      name: menuItem.MenuName,
      quantity: 1,
      price: menuItem.Price,
      custermizeText: "",
      singlePrice: menuItem.Price,
      menuItemID: menuItem.MenuItemID,
    };

    setSelectedFoods((selectedFoods) => {
      const foodNameExists = selectedFoods.find(
        (food) => food.name === newFood.name
      );
      if (!foodNameExists) {
        return [...selectedFoods, newFood];
      } else {
        return selectedFoods;
      }
    });
  };
  const handleAddButtonCick = () => {
    if (newFoodMobile !== null && newFoodMobile.hasOwnProperty("quantity")) {
      setSelectedFoods((selectedFoods) => {
        const foodNameExists = selectedFoods.find(
          (food) => food.name === newFoodMobile.name
        );
        if (!foodNameExists) {
          alert("Food added succesfuly!")
          return [...selectedFoods, newFoodMobile];
        } else {
          alert("Food already added!")
          return selectedFoods;
        }
      });
    } else {
      alert("Please select qauntity of the food!");
    }
  };
  const AddButton = () => {
    return (
      <button className="add-food-button" onClick={handleAddButtonCick}>
        Add
      </button>
    );
  };
  return (
    <div
      className="curved-box"
      onClick={isClickable ? handleClick : null}
      style={{ cursor: "pointer" }}
    >
      <div className="image-container">
        <div className="image-frame">
          <img src={imageUrl} alt="Image" className="image" />
        </div>
      </div>
      <div className="food-text-container">
        <p className="text">{menuItem.MenuName}</p>
        <p className="text">Rs.{menuItem.Price}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MobileFoodOrderCounter
            menuItem={menuItem}
            setNewFoodMobile={setNewFoodMobile}
            setSelectedFoods={setSelectedFoods}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AddButton />
        </div>
      </div>
    </div>
  );
};

export default FoodComponent;

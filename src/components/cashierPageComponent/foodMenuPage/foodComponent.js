import React, { useEffect, useState } from "react";
import "./foodComponent.css"; // Import CSS file for styling
import MobileFoodOrderCounter from "./mobileFoodOrderCounter";
import imageUrl1 from "../../../assets/images/food1.jpg";
import imageUrl2 from "../../../assets/images/food2.jpg";
import imageUrl3 from "../../../assets/images/food3.jpg";
import imageUrl4 from "../../../assets/images/food4.png";
import imageUrl5 from "../../../assets/images/food5.jpeg";
import imageUrl6 from "../../../assets/images/food6.png";
import imageUrl7 from "../../../assets/images/food7.jpg";
import imageUrl8 from "../../../assets/images/food8.jpg";
import imageUrl9 from "../../../assets/images/food9.jpg";
import imageUrl10 from "../../../assets/images/food10.jpg";
import imageUrl11 from "../../../assets/images/food11.png";
import imageUrl12 from "../../../assets/images/food12.jpg";
import imageUrl13 from "../../../assets/images/food13.jpg";
import imageUrl14 from "../../../assets/images/food14.jpg";
import imageUrl15 from "../../../assets/images/food15.jpg";
import imageUrl16 from "../../../assets/images/food16.jpg";
import imageUrl17 from "../../../assets/images/food17.jpg";
import imageUrl18 from "../../../assets/images/food18.jpg";
import { toast, ToastContainer } from 'react-toastify';
import { useAccount } from "@azure/msal-react";


const FoodComponent = ({ menuItem, setSelectedFoods }) => {
  const [isClickable, setIsClickable] = useState(false);
  const [newFoodMobile, setNewFoodMobile] = useState(null);
  const [imageUrl, setImageUrl]= useState(imageUrl1);
  const imageUrls =[imageUrl1,imageUrl2,imageUrl3,imageUrl4,imageUrl5,imageUrl6,imageUrl5,imageUrl6,imageUrl7,imageUrl8,imageUrl9,imageUrl10,imageUrl11,imageUrl12,imageUrl13,imageUrl14,imageUrl15,imageUrl16,imageUrl17,imageUrl18];
  useEffect(() => {
    setImageUrl(getRandomUrl());
    const handleResize = () => {
      setIsClickable(window.innerWidth > 420);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getRandomUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };
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
          toast.success("Food added succesfuly!")
          return [...selectedFoods, newFoodMobile];
        } else {
          toast.success("Food already added!")
          return selectedFoods;
        }
      });
    } else {
      toast.error("Please select qauntity of the food!");
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
      className="curved-box dark:bg-gray-700 dark:text-white"
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

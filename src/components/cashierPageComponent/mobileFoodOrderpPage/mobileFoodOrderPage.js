import React, { useState, useEffect } from "react";
import "./mobileFoodOrderPage.css";
import BillComponent from "../foodOrderPage/billComponent";
import FoodOrderDetails from "../foodOrderPage/foodOrderDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { addOrder } from "../../../services/cashierPageApi";

const MobileFoodOrderPage = ({
  foods,
  setSelectedFoods,
  setIsShowTable,
  selectedTable,
  setIsShowMobileOrderPage,
}) => {
  let total = 0;
  const [cash,setCash] = useState(0);
  const handleSelectTableClick = () => {
    setIsShowTable(true);
  };
  const handleAddOrderClick = () => {
    if (
      !isNaN(cash) &&
      cash !== 0 &&
      selectedTable !== "" &&
      foods.length > 0
    ) {
      const currentDateAndTime = new Date();
      const year = currentDateAndTime.getFullYear();
      const month = ("0" + (currentDateAndTime.getMonth() + 1)).slice(-2); // Adding leading zero if needed
      const day = ("0" + currentDateAndTime.getDate()).slice(-2); // Adding leading zero if needed
      const hours = ("0" + currentDateAndTime.getHours()).slice(-2); // Adding leading zero if needed
      const minutes = ("0" + currentDateAndTime.getMinutes()).slice(-2); // Adding leading zero if needed
      const seconds = ("0" + currentDateAndTime.getSeconds()).slice(-2); // Adding leading zero if needed
      const dateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const orderData = {
        tableCode: selectedTable,
        cashPaid: cash,
        totalPrice: totalPrice,
        foodStatus: "pending",
        balance: cash - totalPrice,
        dateAndTime: dateAndTime,
        orderDetails: foods,
      };
      addOrder({ orderData });
      alert("Order added succesfuly!")
    } else {
      if (isNaN(cash) || cash == 0) {
        alert("Enter valid amount of cash!");
      } else if (selectedTable === "") {
        alert("Select a table!")
      }else{
        alert("Select any foods!")
      }
    }
  };
  useEffect(() => {
    Object.keys(foods).map((foodKey) => (total = total + foods[foodKey].price));
    setTotalPrice(total);
  }, [foods.length]);
  const [totalPrice, setTotalPrice] = useState(0);
  const TabButton = ({ color, text, onPressed, width }) => {
    return (
      <button
        className="mobile-custom-button-cashier"
        style={{ backgroundColor: color, width: width }}
        onClick={onPressed}
      >
        {text}
      </button>
    );
  };
  const handleCloseIconClick = () => {
    setIsShowMobileOrderPage(false);
    //  navigate('/cashier-home-page/orders');
  };
  return (
    <div className="mobile-order-main-container">
      <FontAwesomeIcon
        icon={faClose}
        className="close-icon"
        onClick={handleCloseIconClick}
      />
      <TabButton
        color={"rgb(193, 64, 0)"}
        text={selectedTable === "" ? "Select Table" : selectedTable}
        onPressed={handleSelectTableClick}
        width={"80%"}
      />
      <div className="mobile-food-order-details">
        {foods.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "grey",
              width: "100%",
            }}
          >
            Select Any Food
          </div>
        ) : (
          Object.keys(foods).map((foodKey) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              key={foodKey}
            >
              <FoodOrderDetails
                foodName={foods[foodKey].name}
                price={foods[foodKey].price}
                singlePrice={foods[foodKey].singlePrice}
                quantity={foods[foodKey].quantity}
                custermizeText={foods[foodKey].custermizeText}
                uKey={foodKey}
                setSelectedFoods={setSelectedFoods}
                setTotalPrice={setTotalPrice}
              />
            </div>
          ))
        )}
      </div>
      <BillComponent totalPrice={totalPrice} setCash={setCash}/>
      <TabButton
        color={"green"}
        text={"Proceed"}
        onPressed={handleAddOrderClick}
        width={"80%"}
      />
    </div>
  );
};

export default MobileFoodOrderPage;

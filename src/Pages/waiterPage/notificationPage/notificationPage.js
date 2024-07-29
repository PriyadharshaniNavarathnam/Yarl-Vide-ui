import React, { useEffect, useState } from "react";
import OrderDetailsComponent from "../../../components/waiterPageComponents/notificationPageComponents/orderDetails";
import WaiterSearchBar from "../../../components/waiterPageComponents/notificationPageComponents/searchBar";
import { getNotificationData } from "../../../services/notificationPageApi";

import "./notificationPage.css";
import Navbar from "../../../components/Navbar/Navbar";
const NotificationPage = () => {
  const [searchText, setSearchText] = useState("");
  const [notificationData, setNotificationData] = useState([]);
  const fetchNotificationData = async () => {
    try {
      await getNotificationData({ setNotificationData: setNotificationData });
      console.log("Notification data fetched successfully!");
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  };
  useEffect(() => {
    fetchNotificationData();
  }, []);


  return (
    <div className="dark:bg-secondary dark:text-white">
      <Navbar setSearchText={setSearchText}/>
      <div className="header">
        <h1 className="title">Notifications</h1>
        <WaiterSearchBar setSearchText={setSearchText} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="titleContainer dark:bg-gray-900 dark:text-white rounded-md">
          <div className="row">
            <div className="label">OrderID</div>
            <div className="label">Table Number</div>
            <div className="label">Delivered</div>







          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="detailsContainer dark:bg-secondary dark:text-white">
          {notificationData.map((dataItem) => (
            <div key={dataItem.OrderID}>
              {dataItem.OrderID.toString().includes(searchText) && (
                <OrderDetailsComponent
                  id={dataItem.OrderID}
                  tableNo={dataItem.TableCode}
                  foodStatus={dataItem.FoodStatus}
                />
              )}
              <div style={{ marginBottom: "0.3%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NotificationPage;

import { useEffect, useState } from "react";
import KitchenOrderDetailsComponent from "../../components/kitchenStaffComponents/kitchenOrderDetailsComponent";
import KitchenPageHeader from "../../components/kitchenStaffComponents/kitchenPageHeader";
import "./kitchenStaffPage.css";
import OrderDetailsKitchen from "../../components/kitchenStaffComponents/orderDetailsKitchen";
import { getOrderData } from "../../services/kitchenStaffPageApi";
const KitchenStaffPage = () => {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOrderSelected, setIsOrderSelected] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 420);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    getOrderData({ setOrderData });
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      {(isMobileScreen&&isOrderSelected)?<div style={{justifyContent:"center",width:"100%",height:"100%"}}>
        <OrderDetailsKitchen
            orderId={orderId}
            dateAndTime={dateAndTime}
            setIsOrderSelected={setIsOrderSelected}
            ordersDetails={ordersDetails}
          />
      </div>:
      <div>
      <KitchenPageHeader setSearchText={setSearchText} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            className={`kitchen-titles`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="kitchen-page-titleContainer">
              <div className="kitchen-page-row">
                <div className="kitchen-page-label">OrderID</div>
                <div className="kitchen-page-label">Date and Time</div>
                <div className="kitchen-page-label">Status</div>
              </div>
            </div>
          </div>
          <div className="kitchen-order-details">
            <div className="detailsContainer">
              {orderData.map((dataItem) => (
                <div key={dataItem.OrderID}>
                  {dataItem.OrderID.toString().includes(searchText) ? (
                    <KitchenOrderDetailsComponent
                      id={dataItem.OrderID}
                      dateAndTime={
                        dataItem.DateAndTime.replace("T", " ").split(":")[0] +
                        ":" +
                        dataItem.DateAndTime.replace("T", " ").split(":")[1]
                      }
                      setIsOrderSelected={setIsOrderSelected}
                      setOrderId={setOrderId}
                      setDateAndTime={setDateAndTime}
                      foodStatus = {dataItem.FoodStatus}
                      setOrdersDetails={setOrdersDetails}
                    />
                  ) : (
                    <div></div>
                  )}
                  <div style={{ marginBottom: "0.3%" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {!isMobileScreen&& isOrderSelected && (
          <OrderDetailsKitchen
            orderId={orderId}
            dateAndTime={dateAndTime}
            setIsOrderSelected={setIsOrderSelected}
            ordersDetails={ordersDetails}
          />
        )}
      </div>
    </div>
      
    }
    </div>
  );
};
export default KitchenStaffPage;

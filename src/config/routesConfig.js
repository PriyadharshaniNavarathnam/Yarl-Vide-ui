// routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NotificationPage from "../Pages/waiterPage/notificationPage/notificationPage";


import MobileFoodOrderPage from "../components/cashierPageComponent/mobileFoodOrderpPage/mobileFoodOrderPage";
import App from "../App";
import SelectTablePage from "../components/cashierPageComponent/selectTable/selectTable";
import KitchenStaffPage from "../Pages/kitchenStaffPage/kitchenStaffPage";
import CashierHomePage from "../Pages/cashierPage/cashierHomePage";
import WaiterTablePage from "../Pages/waiterPage/tablePage/tablePage";
import ProtectedRoutes from "../components/ProtectedRoutes";

const RoutesConfig = () => {
  
  const isLogged = localStorage.getItem("user");
  console.log(isLogged)
  return (
    <Router>
      <Routes>
        <Route path="/" element={
           isLogged ? (
            isLogged === "kitchenStaff1" ? (
              <KitchenStaffPage />
            ) : isLogged === "waiter1" ? (
              <WaiterTablePage />
            ) : (
              <CashierHomePage />
            )
          ) : (
            <ProtectedRoutes />
          )
           } />
        <Route path="/waiter-page" element={<WaiterTablePage />} />
        <Route
          path="/waiter-page/notification-page"
          element={<NotificationPage />}
        />

        <Route path="/cashier-home-page" element={<CashierHomePage />} />
        <Route
          path="/cashier-home-page/select-table"
          element={<SelectTablePage />}
        />
        <Route
          path="/cashier-home-page/orders"
          element={<MobileFoodOrderPage />}
        />

        <Route path="/kitchen-staff" element={<KitchenStaffPage />} />

        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
};

export default RoutesConfig;

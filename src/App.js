import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CashierHomePage from "./Pages/cashierPage/cashierHomePage";
import KitchenStaffPage from "./Pages/kitchenStaffPage/kitchenStaffPage";
import WaiterTablePage from "./Pages/waiterPage/tablePage/tablePage";
import { logout } from "./services/loginPageApi";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/cashier" element={<CashierHomePage />} />
      <Route path="/kitchenStaff" element={<KitchenStaffPage />} />
      <Route path="/waiterTable" element={<WaiterTablePage />} />

      <Route path="/login" element={<LoginForm />} />
      <Route
        path="*"
        element={
          <div>
            <header>
              <h1>Not Found</h1>
            </header>
            <p>
              <a href="/">Back to Home</a>
            </p>
          </div>
        }
      />
    </Route>
  )
);

function App() {
  const isLogged = localStorage.getItem("user");
  //const user = JSON.parse(isLogged);
  //const username = user.username || localStorage.getItem("username");
  console.log(isLogged + "hi");
  return (
    <section>
      <div className="top-nav">
        {isLogged ? (
          isLogged === "kitchenStaff1" ? (
            <KitchenStaffPage />
          ) : isLogged === "waiter1" ? (
            <WaiterTablePage />
          ) : (
            <CashierHomePage />
          )
        ) : (
          <span className="item-holder">
            <LoginForm />
          </span>
        )}
      </div>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
// import CashierHomePage from "./Pages/cashierPage/cashierHomePage";
// import kitchenStaffPage from "./Pages/kitchenStaffPage/kitchenStaffPage";
// import tablePage from "./Pages/waiterPage/tablePage/tablePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoutes />}>
        {/* <Route path="/" element={< />} /> */}
        {/* <Route path="/cashier" element={<CashierHomePage />} /> */}
        {/* <Route path="/kitchenStaff" element={<kitchenStaffPage />} /> */}
        {/* <Route path="/waiterTable" element={<tablePage />} /> */}
      </Route>
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
  console.log(isLogged)
  return (
    <section>
      <div className="top-nav">
        {isLogged ? (
          <span className="item-holder">
            {/* <a href="/cashier">Cashier</a> */}
            {/* <a href="/kitchenStaff">Kitchen Staff</a> */}
            <a href="/waiterTable">Waiter</a>
            <span>Log Out</span>
          </span>
        ) : (
          <span className="item-holder">
            <LoginForm/>
          </span>
        )}
      </div>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;

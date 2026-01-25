import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import AddExport from "../Pages/AddExport/AddExport";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyExports from "../Pages/MyExports/MyExports";
import MyImports from "../Pages/MyImports/MyImports";
import Register from "../Pages/Register/Register";
import Loading from "../Components/Loading";
import ProductDetails from "../Components/ProductDetails";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../Components/ErrorPage";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Shared/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/latest-products`),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
        loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/products`),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/my-exports",
        element: (
          <PrivateRouter>
            <MyExports></MyExports>
          </PrivateRouter>
        ),
      },
      {
        path: "/my-imports",
        element: (
          <PrivateRouter>
            <MyImports></MyImports>
          </PrivateRouter>
        ),
      },
      {
        path: "/add-export",
        element: (
          <PrivateRouter>
            <AddExport></AddExport>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "my-exports",
        element: <MyExports></MyExports>,
      },
      {
        path: "my-imports",
        element: <MyImports></MyImports>,
      },
      {
        path: "add-export",
        element: <AddExport></AddExport>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

export default router;

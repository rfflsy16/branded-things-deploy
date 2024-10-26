import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Categories from "../views/Categories";
import AddProduct from "../views/AddProduct";
import EditProduct from "../views/EditProduct";
import AddUser from "../views/AddUser";
import UploadImage from "../views/UploadImage";
const base_url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage base_url={base_url} />,
      },
      {
        path: "/categories",
        element: <Categories base_url={base_url} />,
      },
      {
        path: "/add-product",
        element: <AddProduct base_url={base_url} />,
      },
      {
        path: "/add-user",
        element: <AddUser base_url={base_url} />,
      },
      {
        path: "/edit/:id",
        element: <EditProduct base_url={base_url} />,
      },
      {
        path: "/upload-image/:id",
        element: <UploadImage base_url={base_url} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
]);

export default router;

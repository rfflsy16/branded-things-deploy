import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import DetailProduct from "../views/DetailProduct";

const base_url = "https://h8-phase2-gc.vercel.app";

function router() {
  return createBrowserRouter([
    {
      path: "/",
      element: <HomePage base_url={base_url} />,
    },
    {
      path: "/detail/:id",
      element: <DetailProduct base_url={base_url} />,
    },
  ]);
}

export default router;

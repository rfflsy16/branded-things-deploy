import createAppRouter from "./routers";
import { RouterProvider } from "react-router-dom";

function App() {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
}

export default App;

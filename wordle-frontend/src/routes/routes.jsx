import { createBrowserRouter } from "react-router-dom";
import GamePage from "../pages/GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,          
        element: <GamePage /> 
      },
    ],
  },
  {
    path: "*",
    element: <div className="p-6">404 | Página no encontrada</div>,
  },
]);

export default router;

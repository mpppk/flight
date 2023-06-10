import React from "react";
import ReactDOM from "react-dom/client";
import JALApp from "./JALApp.tsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return redirect("/jal");
    },
  },
  {
    path: "/jal",
    element: <JALApp />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

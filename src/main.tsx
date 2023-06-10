import React from "react";
import ReactDOM from "react-dom/client";
import JALApp from "./JALApp.tsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from "./SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return redirect("/jal");
    },
  },
  {
    path: "/signin",
    element: <SignIn />,
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

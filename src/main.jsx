import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layout/MainLayout.jsx";
import UserDetails from "./components/UserDetails.jsx";
import editUser from "./components/editUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: App },
      {
        path: "/users/:id",
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/users/${params.id}`);
        },
        Component: UserDetails,
      },
      {
        path: "/users/:id/edit",
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/users/${params.id}`);
        },
        Component: editUser,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

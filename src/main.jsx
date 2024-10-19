import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home/Home";
import BookDetails from './pages/BookDetails/BookDetails'
import ErrorPage from './pages/ErrorPage/ErrorPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/book-details/:bookId",
    element: <BookDetails />,
    errorElement: <ErrorPage />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1 id='title'>Books Manager</h1>
    <RouterProvider router={router} />
  </StrictMode>
);

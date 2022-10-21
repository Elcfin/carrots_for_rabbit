import { Navigate } from "react-router";
import { RouteProps } from "react-router-dom";

import About from "../pages/about";
import Home from "../pages/home";
import Auth from "../pages/auth";
import Search from "../pages/search";
import Tag from "../pages/tag";

export const routesObj: (RouteProps & { protected: boolean })[] = [
  { path: "/home", element: <Home />, protected: false },
  { path: "/about", element: <About />, protected: true },
  { path: "/auth", element: <Auth />, protected: false },
  { path: "/tag", element: <Tag />, protected: false },
  { path: "/search", element: <Search />, protected: false },
  {
    path: "/",
    element: <Navigate to={"/home"} />,
    protected: false,
  },
];

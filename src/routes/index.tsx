import { Navigate } from "react-router";
import { RouteProps } from "react-router-dom";

import About from "../pages/about";
import Home from "../pages/home";
import Auth from "../pages/auth";
import Search from "../pages/search";
import Tags from "../pages/tags";
import Tag from "../pages/tag";
import AskQues from "../pages/askQues.tsx";
import ShowQues from "../pages/showQues";

export const routesObj: (RouteProps & { protected: boolean })[] = [
  { path: "/home", element: <Home />, protected: false },
  { path: "/about", element: <About />, protected: true },
  { path: "/about/:username", element: <About />, protected: true },
  { path: "/auth", element: <Auth />, protected: false },
  { path: "/tags", element: <Tags />, protected: false },
  { path: "/tag", element: <Tag />, protected: false },
  { path: "/search", element: <Search />, protected: false },
  { path: "/ask_ques", element: <AskQues />, protected: true },
  { path: "/show_ques", element: <ShowQues />, protected: false },
  {
    path: "/",
    element: <Navigate to={"/home"} />,
    protected: false,
  },
];

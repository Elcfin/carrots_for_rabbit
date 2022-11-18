import "./App.scss";
import { Routes, Route } from "react-router";
import { routesObj } from "./routes";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";

const App = () => {
  return (
    <div className="app">
      <MyNav />
      <div className="app-main">
        <Routes>
          {routesObj.map((o) => {
            return <Route {...o} key={o.path} />;
          })}
        </Routes>
      </div>
      <MyFooter />
    </div>
  );
};
export default App;

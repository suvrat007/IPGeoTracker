import './App.css';
import { Provider } from "react-redux";
import store from "./Utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Map from "./Components/Map";
import MapWithPins from "./Components/MapWithPins";
import MapPath from "./Components/MapPath";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },{
    path: "/map",
    element: <Map />,
  },{
    path: "/mapPath",
        element: <MapPath />,
    },
]);

const App= ()=> {
  return (
      <Provider store={store}>
        <div className="border-2 h-[100vh] bg-gradient-to-r from-teal-200 to-lime-200">
          <RouterProvider router={appRouter} />
        </div>
      </Provider>
  );
}

export default App;

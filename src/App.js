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

function App() {
  return (
      <Provider store={store}>
        <div>
          <RouterProvider router={appRouter} />
        </div>
      </Provider>
  );
}

export default App;

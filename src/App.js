import './App.css';
import { Provider } from "react-redux";
import store from "./Utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Map from "./Components/Map";
import MapWithPins from "./Components/MapWithPins";
import MapPath from "./Components/MapPath";
import Login from "./Components/Login";
import auth from "../src/Utils/firebaseConfig"

const appRouter = createBrowserRouter([
    {
        path: "/login",
        element:<Login/>
    },
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

          <div className="bg-cover bg-center h-screen bg-earth_space bg-blackOverlay">
              <div className="w-[100vw] h-[100vh]">
                  <RouterProvider router={appRouter}/>
              </div>
          </div>


      </Provider>
  );
}

export default App;

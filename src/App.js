import './App.css';
import {Provider, useDispatch} from "react-redux";
import store from "./Utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Map from "./Components/Map";
import MapPath from "./Components/MapPath";
import Login from "./Components/Login";
import RouteComp from "./Components/RouteComp";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <RouteComp />,
        children:[
            {
                path:"/",
                element:<Body/>,
            },{
                path: "/login",
                element:<Login/>
            },{
                path: "/map",
                element: <Map />,
            },{
                path: "/mapPath",
                element: <MapPath />,
            }
        ]
    }


]);

const App= ()=> {

  return (
      <Provider store={store}>
          <div className="bg-cover bg-center h-screen bg-earth_space ">
              <div className="w-[100vw] h-[100vh]">
                  <RouterProvider router={appRouter}/>
              </div>
          </div>
      </Provider>
  );
}

export default App;

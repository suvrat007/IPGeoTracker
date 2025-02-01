import './App.css';
import {Provider, useDispatch} from "react-redux";
import store from "./Utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Map from "./Components/Map";
import MapPath from "./Components/MapPath";
import Login from "./Components/Login";
import RouteComp from "./Components/RouteComp";
import Spline from '@splinetool/react-spline';

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
          <div
              className="relative w-screen h-screen bg-cover bg-center font-montserrat"
              style={{ backgroundImage: "url('https://images.hdqwalls.com/download/space-stars-purple-sky-3n-1920x1080.jpg')" }}
          >
              {/* Background Spline */}
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <div className="w-full h-full md:w-[90%] md:h-[90%] lg:w-[80%] lg:h-[80%]">
                      <Spline scene="https://prod.spline.design/xppCBxhIhqTjTGX7/scene.splinecode"/>
                  </div>
              </div>


              {/* Foreground Content */}
              <div className="relative z-10 w-full h-full items-center">
                  <RouterProvider router={appRouter}/>
              </div>
          </div>
      </Provider>


  );
}

export default App;

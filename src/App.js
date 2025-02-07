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
              className="relative flex flex-row w-screen h-screen bg-cover bg-center font-montserrat overflow-x-hidden"
              style={{ backgroundImage: "url('https://images.hdqwalls.com/download/space-stars-purple-sky-3n-1920x1080.jpg')" }}
          >
              {/* Foreground Content */}
              <div className=" w-full h-full items-center">
                  <RouterProvider router={appRouter}/>
              </div>

              {/* Background Spline */}
              <div className="inset-0 w-full h-full flex justify-center items-center">
                  <div className="right-0 w-full h-full md:w-[100%] md:h-[90%] lg:w-[95%] lg:h-[100%] ">
                      <Spline scene="https://prod.spline.design/xppCBxhIhqTjTGX7/scene.splinecode"/>
                      {/*<Spline scene="https://prod.spline.design/cUhdOzs9Q93Y2UJz/scene.splinecode" />*/}
                  </div>
              </div>



          </div>
      </Provider>


  );
}

export default App;

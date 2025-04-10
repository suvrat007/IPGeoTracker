import './App.css';
import {Provider, useDispatch} from "react-redux";
import store from "./Utils/Redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/HomePage/Body";
import Map from "./Components/Map Pins/Map";
import MapPath from "./Components/Map Path/MapPath";
import Home from "./Components/HomePage/Home";
import Login from "./Components/Authentication/Login";
import RouteComp from "./Components/RouteComp";
import Spline from '@splinetool/react-spline';
import SignUp from "./Components/Authentication/SignUp";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./Components/NavBar/NavBar";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <RouteComp />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/map",
                element: (
                    <ProtectedRoute>
                        <Map />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/mapPath",
                element: (
                    <ProtectedRoute>
                        <MapPath />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

const App= ()=> {

  return (
      // <Provider store={store}>
      //     <div
      //         className="relative flex flex-row w-screen h-screen bg-cover bg-center font-montserrat overflow-x-hidden"
      //         style={{ backgroundImage: "url('https://images.hdqwalls.com/download/space-stars-purple-sky-3n-1920x1080.jpg')" }}
      //     >
      //         {/* Foreground Content */}
      //         <div className=" w-full h-full items-center">
      //             <RouterProvider router={appRouter}/>
      //         </div>
      //
      //         {/* Background Spline */}
      //         <div className="inset-0 w-full h-full flex justify-center items-center">
      //             <div className="right-0 w-full h-full md:w-[100%] md:h-[90%] lg:w-[95%] lg:h-[100%] ">
      //                 <Spline scene="https://prod.spline.design/xppCBxhIhqTjTGX7/scene.splinecode"/>
      //                 {/*<Spline scene="https://prod.spline.design/cUhdOzs9Q93Y2UJz/scene.splinecode" />*/}
      //             </div>
      //         </div>
      //
      //
      //
      //     </div>
      // </Provider>

      <Provider store={store}>
          <div className="bg-black h-full text-white">
              <RouterProvider router={appRouter}/>
          </div>
      </Provider>


  );
}

export default App;

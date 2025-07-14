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
import SignUp from "./Components/Authentication/SignUp";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteMaps from "./ProtectedRouteMaps";

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
                    <ProtectedRouteMaps>
                        <Map />
                    </ProtectedRouteMaps>                ),
            },
            {
                path: "/mapPath",
                element: (
                    <ProtectedRouteMaps>
                        <MapPath />
                    </ProtectedRouteMaps>
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

      <Provider store={store}>
          <div className="bg-black h-full text-white">
              <RouterProvider router={appRouter}/>
          </div>
      </Provider>

  );
}

export default App;

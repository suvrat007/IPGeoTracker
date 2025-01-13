import './App.css';
import { Provider } from "react-redux";
import store from "./Utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Map from "./Components/Map";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },{
    path: "/map",
    element: <Map />,
  }
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

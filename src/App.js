import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/api/v1/search",
        element: <Body />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

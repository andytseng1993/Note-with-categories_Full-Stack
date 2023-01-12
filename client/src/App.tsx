import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomePage />}>
        <Route path="/new" element={<h1>New??!</h1>} />
        <Route path="/:id">
          <Route index element={<h1>Show note</h1>} />
          <Route path={"edit"} element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
    )
  );
  return (
    <>
      <AppNavbar>
        <RouterProvider router={router} />
      </AppNavbar>
    </>
  )
}

export default App;

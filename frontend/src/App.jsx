import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;
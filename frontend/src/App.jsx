import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  // Hide navbar on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;

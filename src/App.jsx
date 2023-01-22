import { Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { HomePage } from "./pages/HomePage";
import "./index.css";
import { ContextAPIProvider } from "./context/contextAPI";

const App = () => {
  return (
    <>
      <ContextAPIProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<HomePage />} path="/home" />
          </Route>
        </Routes>
      </ContextAPIProvider>
    </>
  );
};

export default App;
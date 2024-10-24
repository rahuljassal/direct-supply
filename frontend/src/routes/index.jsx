import { useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getAuthentication } from "../redux/slices/authSlice";
import SnackbarAlert from "../components/SnackbarAlert/SnackbarAlert";
import { Box } from "@mui/material";

// Lazy load components
const RootLayout = lazy(() => import("../layouts/rootLayout"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const FeaturePage = lazy(() => import("../pages/Feature/FeaturePage"));

// Loading fallback component
const LoadingFallback = () => (
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <Box>Loading...</Box>
  </Box>
);

const AppRoutes = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthenticated = useSelector(getAuthentication);
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/register") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <MainLayout /> : <RootLayout />}
          >
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login type="register" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productmanager" element={<FeaturePage />} />
            <Route path="/priceoptimiser" element={<FeaturePage />} />
            {/* Error route */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
      <SnackbarAlert />
    </>
  );
};

export default AppRoutes;

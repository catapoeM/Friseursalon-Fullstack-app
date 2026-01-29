import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AdminGetStylists from "./pages/AdminGetStylists.jsx";

import Home from "./pages/Home.jsx";
import Preise from "./pages/Preise.jsx";
import Produkte from "./pages/Produkte.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import StylistsPage from "./pages/StylistsPage.jsx";
import StylistServices from "./pages/StylistServices.jsx"
import Kontakt from "./pages/Kontakt.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";

import DefaultLayout from './layouts/MainLayout.jsx'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/preise" element={<Preise />} />
            <Route path="/produkte" element={<Produkte />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/stylists" element={<StylistsPage />} />
            <Route path="/stylists/:stylistId" element={<StylistServices />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/register" element={<AdminRegisterPage />} />
            <Route path="/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="admin">
                  <AdminGetStylists/>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

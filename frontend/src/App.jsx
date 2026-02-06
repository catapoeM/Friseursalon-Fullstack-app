import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCreateStylist from "./pages/admin/AdminCreateStylist.jsx";
import AdminEditStylist from "./pages/admin/AdminEditStylist.jsx";
import NotFound from "./pages/NotFound.jsx";
import CustomAlert from "./components/common/CustomAlert.jsx";

import useStore from "./hooks/useStore.jsx";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout.jsx";

const App = () => {
  const {loggedinAdmin, adminCheckLogin} = useStore((state) => state);

  useEffect(() => {
    adminCheckLogin()
  }, [])

  const loggedinRoute = (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/createstylist" element={<AdminCreateStylist />} />
        <Route path="/editstylist/:stylistId" element={<AdminEditStylist />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/preise" element={<Preise />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/stylists" element={<StylistsPage />} />
        <Route path="/stylists/:stylistId" element={<StylistServices />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<AdminRegisterPage />} />
        
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  )

  const defaultRouter = (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/preise" element={<Preise />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/stylists" element={<StylistsPage />} />
        <Route path="/stylists/:stylistId" element={<StylistServices />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<AdminRegisterPage />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  )
  const router = loggedinAdmin ? loggedinRoute : defaultRouter;

  return (
    <>
      <CustomAlert/>
      <Router>
        {router}
      </Router>
    </>
  )
};

export default App;

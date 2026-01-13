import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Preise from "./pages/Preise.jsx";
import Produkte from "./pages/Produkte.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Zeiten from "./pages/Zeiten.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";

import DefaultLayout from './components/layouts/MainLayout.jsx'

const App = () => {
  return (
    <Router>
      <Routes element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/preise" element={<Preise />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/zeiten" element={<Zeiten />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </Router>
  );
};

export default App;

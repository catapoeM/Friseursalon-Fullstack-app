import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Preise from "./pages/Preise.jsx";
import Produkte from "./pages/Produkte.jsx";
import Login from "./pages/Login.jsx";
import Verify from "./pages/Verify.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Zeiten from "./pages/Zeiten.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";

const App = () => {
  return (
    <Router>
      <div className="app-layout">
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preise" element={<Preise />} />
            <Route path="/produkte" element={<Produkte />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/zeiten" element={<Zeiten />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

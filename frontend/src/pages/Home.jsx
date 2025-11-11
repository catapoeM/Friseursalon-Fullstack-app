import '../Styles/Home.css';
const Home = () => {
  return (
    <div className="home-container">
      {/* Linke Navigationsseite */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="/preise">Preise</a></li>
            <li><a href="/produkte">Produkte</a></li>
            <li><a href="/verify">Login</a></li>
            <li><a href="/booking">Termin buchen</a></li>
            <li><a href="/zeiten">Öffnungszeiten</a></li>
            <li><a href="/kontakt">Kontakt</a></li>
            <li><a href="/datenschutz">Datenschutz</a></li>
          </ul>
        </nav>
      </aside>

      {/* Mittlerer Bereich mit Text */}
      <main className="main-content">
        <section>
          <h1>Willkommen im ZC Salon</h1>
          <p>
            Bei Salon ZC steht Ihr Wohlbefinden im Mittelpunkt.  
            Unser Team aus erfahrenen Stylisten berät Sie individuell  
            und sorgt für Ihren perfekten Look.
          </p>
        </section>
      </main>

      {/* Rechte Seite für spätere Bilder */}
      <aside className="image-section">
        <div className="image-placeholder">
          <p>Hier kommen später Bilder des Salons oder Teams.</p>
        </div>
      </aside>
    </div>
  );
};

export default Home;

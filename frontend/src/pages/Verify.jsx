import { useNavigate } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Überprüfe Verifikationslink...");

  useEffect(() => {
    const verify = async () => {
      try {
        const email = await completeEmailLogin(window.location.href);
        setMessage(`🎉 Willkommen, ${email}!`);
        setTimeout(() => navigate("/"), 1500); // ⏩ nach 1,5 Sek. weiterleiten
      } catch (error) {
        setMessage("❌ Verifikation fehlgeschlagen.");
      }
    };
    verify();
  }, []);
}

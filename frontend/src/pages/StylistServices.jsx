import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StylistServices = () => {
    const {stylistId} = useParams() 
    const [stylist, setStylist] = useState([]);

    useEffect(() => {
        const stored = sessionStorage.getItem('stylists');

        if (stored) {
            const stylists = JSON.parse(stored);
            const found = stylists.find(s => s._id === stylistId)

            if (found) {
                setStylist(found);
                return;
            }

            // Fallback : Go to the previous page
            navigate('/stylists');
        }
    }, [stylistId])

    if (!stylist) return <p>Lade Services...</p>;

    return (
        <div>
        <h2>{stylist.name}</h2>
            <h3>Services</h3>
            <h3>{stylist._id}</h3>
                
            
        </div>
    );
};

export default StylistServices;

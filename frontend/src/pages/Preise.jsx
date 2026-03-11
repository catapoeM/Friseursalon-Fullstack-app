
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack
} from "@mui/material";
import BackgroundPic from "../components/common/BackgroundPic";
import useStore from "../hooks/useStore";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";

const PricesPage = () => {
    const {getStylists, raiseAlert} = useStore((state) => state)
    const [isLoading, setIsLoading] = useState(true);
    const [stylists, setStylists] = useState([])

    const fetchStylists = async () => {
        const res = await getStylists();
        if (!res) {
            raiseAlert({
                title: 'Fast geschafft...',
                text: 'Die stylists konnten nicht abgeruft werden',
                severity: 'warning'
            })
            return
        }
        setStylists(res.data)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchStylists();
    }, [])

    const allServices = stylists.flatMap(stylist => stylist.services)

    const priceRanges = {};

    allServices.forEach(service => {
        const name = service.serviceName;

        if (!priceRanges[name]) {
            priceRanges[name] = {
                min: service.price,
                max: service.price
            }
        }
        else {
            priceRanges[name].min = Math.min(priceRanges[name].min, service.price)
            priceRanges[name].max = Math.max(priceRanges[name].max, service.price)
        }
    })
    
    // ⛔ Loading State
    if (isLoading) {
        <Loading></Loading>
    }


    console.log(stylists)
    return (
        <BackgroundPic
        >
            <Container maxWidth="lg" sx={{ py: 8 }}>
            <Stack spacing={6}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <Typography sx={{fontSize: "clamp(1rem, 2.5vw, 2rem)"}} variant="h3" fontWeight="bold" textAlign="center" color="text.secondary">
                    Preise
                    </Typography>
                </Card>
                <Stack spacing={6}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Typography sx={{fontSize: "clamp(1rem, 2.5vw, 2rem)"}}  variant="h4" fontWeight="arial" textAlign="center" color="text.secondary">
                        Unsere Preise befinden sich innerhalb des folgenden Betragsbereichs
                        </Typography>
                        {Object.entries(priceRanges).map(([name, range]) => (
                            <Typography sx={{fontSize: "clamp(1rem, 2.5vw, 2rem)"}}  key={name} variant="h3" fontWeight="bold" textAlign="center" color="text.secondary">
                                {name} - {range.min}€ - {range.max}€
                            </Typography>
                        ))}
                    </Card>
                </Stack>
            </Stack>
            </Container>
        </BackgroundPic>
    );
}

export default PricesPage
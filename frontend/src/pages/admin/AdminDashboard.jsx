import { useEffect, useState } from "react";
import {Grid, Card, CardContent, CardActionArea, Typography, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, List, ListItem, ListItemText} from "@mui/material"
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import StylistActionDialog from "../../components/StylistActionDialog";
import useStore from "../../hooks/useStore";
import { formatDate } from "../../utils/dateFormatter";

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import EuroIcon from '@mui/icons-material/Euro';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FaceIconMan from '@mui/icons-material/Face';
import FaceIconWoman from '@mui/icons-material/Face3';
import ChildIcon from '@mui/icons-material/ChildCare';

const AdminDashboard = () => {
  const {loggedinAdmin} = useStore((state) => state);
  const [stylists, setStylists] = useState([]);
  // Initialisieren (läuft wenn loggedinAdmin data in useStore is changed)
  useEffect(() => {
    setStylists(loggedinAdmin)
  }, [loggedinAdmin]);

  // ⛔ Safety Guard (falls kein Stylist)
  if (!stylists) {
    return null;
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [statusStylist, setStatusStylist] = useState(null)

  const handleOpenDialog = (stylist) => {
    setStatusStylist(stylist.isActive)
    setSelectedStylist(stylist);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedStylist(null);
    setDialogOpen(false);
  };

  return (
      <>
        {stylists?.map(stylist => (
          <Grid item xs={12} sm={6} md={4} key={stylist?._id}>
            <Card sx={{ maxWidth: 320, width: '100%'}}>
              <CardActionArea
                // if I want later to make inactive the cards that are inactive in DB
                //disabled={!stylist?.isActive}
                onClick={() => handleOpenDialog(stylist)}>
                <CardMedia 
                  component="img"         // Höhe fixieren
                  image={stylist?.photo}
                  alt={stylist?.name}
                  sx={{ 
                    aspectRatio: '16/12',
                    objectFit: 'cover', 
                    borderRadius: 2
                  }}
                />
                <CardContent >
                  <Typography variant="h5" align="center">{stylist?.name}</Typography>
                  <Typography variant="body2" align="center" sx={{mt:1}}>{stylist?.bio}</Typography>
                  <Typography variant="h6" sx={{mt: 1}} align="center">Services</Typography>
                  {stylist?.services?.map((service) => (
                  <ListItem>
                    <ListItemText
                        key={service?._id} align="center"
                        primary={<Typography>
                            {service.clientType === 'Man' ? (
                                <>
                                    <FaceIconMan fontSize="small"/>
                                </>
                            ) : service.clientType === 'Woman' ? (
                                <>
                                    <FaceIconWoman fontSize="small"/>
                                    
                                </>
                            ) : (
                                <>
                                    <ChildIcon fontSize="small"/>
                                </>
                            )}
                            {service.serviceName}
                        </Typography>
                        }
                        secondary={
                        <Typography variant="h6">
                            
                            {service.price}<EuroIcon fontSize="small"/>- 
                            <AccessAlarmIcon fontSize="small"/>{service.duration} min
                        </Typography>}
                    />
                  </ListItem>
                  ))}
                  <Card sx={{mt: 1}}>
                    <Typography variant="body2">
                      {formatDate(stylist.createdAt, 'Created')}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(stylist.updatedAt, 'Updated')}
                    </Typography>
                      {stylist?.isActive ? 
                        <PersonIcon/>
                        : 
                        <PersonOffIcon/>
                      }
                  </Card>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {/* Dialog nur einmal laden */}
        <StylistActionDialog
          open={dialogOpen}
          stylist={selectedStylist}
          status={statusStylist}
          onClose={handleCloseDialog}
        />
      </>
  );
}

export default AdminDashboard;
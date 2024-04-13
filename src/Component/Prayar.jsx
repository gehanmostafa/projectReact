
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({name,time,image}) {
    return (
        <Card sx={{minWidth:"200px"}}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 {name}
                </Typography>
                <Typography variant="h1" color="text.secondary" style={{fontWeight:"600",fontSize: "2rem"}}>
                    {time}
                </Typography>
            </CardContent>

        </Card>
    );
}
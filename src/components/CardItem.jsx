import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CardItem = ({ id, title }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link
          to={`/detail/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="p" component="div">
              {title}
            </Typography>
            {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {body}
            </Typography> */}
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;

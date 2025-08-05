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
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ minHeight: "60px", fontSize: "18px" }}
            >
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

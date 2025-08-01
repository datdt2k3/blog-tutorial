import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Link
                to="/detail"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/200"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Link
                to="/detail"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/200"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Link
                to="/detail"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/200"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

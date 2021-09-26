import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styles from "./FriendsSection.module.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button } from "@material-ui/core";

const FriendsSection = () => {
  // const friends = [...friendsData];
  const [top, setTop] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toShow, setToShow] = useState(10);

  useEffect(() => {
    axios("https://api.jikan.moe/v3/top/anime/1/bypopularity")
      .then((res) => {
        setTop(res.data.top);
        // console.log(res.data.top);
      })
      .catch((error) => {
        console.error("error fetching data ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const top10 = top.slice(0, toShow);

  return (
    <>
      <Paper
        elevation={5}
        className={styles.mainContainer}
        style={{ background: "#2ec4b6" }}
      >
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <h1>Most Popular Anime</h1>

            <div className={styles.containerName}>
              <div className={styles.userInputWrp}>
                <br />
                <input
                  type="text"
                  className={styles.inputText}
                  required
                  value={toShow}
                  onChange={(e) => {
                    setToShow(e.target.value);
                  }}
                />
                <span className={styles.floatingLabel1}>Top </span>
                <span className={styles.floatingLabel2}>Anime </span>
              </div>
            </div>

            {top10.map((data) => {
              // console.log("HELLO");
              const {
                title,
                rank,
                score,
                mal_id,
                episodes,
                image_url,
                url,
                members,
              } = data;
              return (
                <Card
                  key={mal_id}
                  sx={{
                    maxWidth: 345,
                    marginBottom: "30px",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={title}
                    image={image_url}
                    height="140"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {rank} : {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>Score : {score}</p>
                      <p>Episodes : {episodes}</p>
                      <p>Liked by {members} weebs</p>
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      backgroundColor: "#E71D36",
                    }}
                  >
                    {/* <Button size="small">Share</Button> */}
                    <Button size="small" href={url} fullWidth>
                      Know More
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        )}
      </Paper>
    </>
  );
};

export default FriendsSection;

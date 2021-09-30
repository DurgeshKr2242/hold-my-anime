import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import styles from "./ChooseYourTop.module.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

const baseUrl =
  "https://private-anon-b41d72021c-jikan.apiary-proxy.com/v3/top/anime/1/";

const ChooseYourTop = () => {
  // const friends = [...friendsData];
  const [top, setTop] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toShow, setToShow] = useState(10);
  const [topFilter, setTopFilter] = useState("tv");

  useEffect(() => {
    axios(`https://api.jikan.moe/v3/top/anime/1/${topFilter}`)
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
  }, [topFilter]);
  const top10 = top.slice(0, toShow);

  const changeHandler = (e) => {
    // console.log(e.target.value);
    setTopFilter(e.target.value);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <Paper
          elevation={5}
          // className={styles.mainContainer}
          style={{ background: "#2ec4b6" }}
        >
          {/* <h1>Most Popular Anime</h1> */}
          <div className={styles.insideMainContainer}>
            <h1>Choose your TOP </h1>
            <div className={styles.select}>
              <select
                className={styles.selectttt}
                name="format"
                id="format"
                onChange={changeHandler}
              >
                <option selected disabled>
                  Choose a option
                </option>
                <option value="bypopularity">Popular</option>
                <option value="favorite">Favourite</option>
                <option value="airing">Airing</option>
                <option value="upcoming">Upcoming</option>
                <option value="tv">TV</option>
                <option value="movie">Movie</option>
                <option value="ova">OVA</option>
                <option value="special">Special</option>
              </select>
            </div>

            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <div>
                <div className={styles.containerName}>
                  <TextField
                    // label="With normal TextField"
                    type="number"
                    min="1"
                    max="50"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: "9ch" }}
                    onChange={(e) => setToShow(e.target.value)}
                    value={toShow}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">TOP </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
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
                        maxWidth: 340,
                        marginBottom: "30px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={title}
                        image={image_url}
                        height="220"
                      />
                      <CardContent>
                        <Typography
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            lineHeight: "22px",
                          }}
                          gutterBottom
                          variant="h7"
                          component="div"
                        >
                          {rank} : {title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{
                            lineHeight: "14px",
                          }}
                        >
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
                        <Button
                          size="small"
                          href={url}
                          fullWidth
                          style={{
                            fontSize: "14px",
                            fontWeight: "semi-bold",
                            paddingTop: "0",
                            paddingBottom: "0",
                          }}
                        >
                          Know More
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ChooseYourTop;

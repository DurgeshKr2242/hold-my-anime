import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import axios from "axios";
// FOR SINGLE CARD
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@material-ui/core";
// ```````````````````````````````````````````
import { FaSearch } from "react-icons/fa";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toShow, setToShow] = useState(50);
  const [pageNo, setPageNo] = useState(1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      axios(
        `https://api.jikan.moe/v3/search/anime?q=${searchTerm}&page=${pageNo}`
      )
        .then((res) => {
          setSearchResult(res.data.results);
          // console.log(res.data.results);
        })
        .catch((error) => {
          console.error("error fetching data ", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
    return () => {
      console.log("HIT!!!");
      clearTimeout(timer);
    };
  }, [searchTerm, pageNo]);

  const top10 = searchResult.slice(0, toShow);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <h1 className={styles.searchH1}>
          Search your <span className={styles.searchSpan}>Anime</span>
        </h1>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            type="text"
            // placeholder="Search for an Anime..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className={styles.searchIcon}
            style={{
              transform: "translate(-36px,7px)",
              // backgroundColor: "#FF9F1C",
              background: "transparent",

              padding: "5px",
            }}
          />
        </div>
        {/* <input
          type="number"
          min="0"
          max="50"
          step="1"
          placeholder="How Many?"
          value={toShow}
          onChange={(e) => setToShow(e.target.value)}
        /> */}
        <div className={styles.inputNumber}>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            onChange={(e) => setToShow(e.target.value)}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={1}
            max={50}
          />
        </div>
        {/* `````` */}
        <div className={styles.select}>
          <select
            className={styles.selectttt}
            name="format"
            id="format"
            onChange={(e) => setPageNo(e.target.value)}
          >
            <option selected disabled>
              SELECT PAGE NUMBER
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </div>
        {/* `````````````` */}
      </div>

      <div className={styles.displayContainer}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          searchTerm &&
          top10.map((data) => {
            const {
              title,

              score,
              mal_id,
              episodes,
              image_url,
              url,
              members,
              airing,
              synopsis,
              type,
              rated,
            } = data;
            return (
              <>
                <Card
                  key={mal_id}
                  sx={{
                    maxWidth: 345,
                    minWidth: 345,
                    margin: "30px",
                  }}
                >
                  <CardHeader
                    // avatar={
                    //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    //     R
                    //   </Avatar>
                    // }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={title}
                    subheader={`Rating: ${score}`}
                  />
                  <CardMedia
                    component="img"
                    height="260"
                    image={image_url}
                    alt={title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.primary">
                      {type} ({episodes} eps)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {airing ? "Airing" : "not airing"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Liked by {members} weebs
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      backgroundColor: "#E71D36",
                    }}
                  >
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    {/* <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton> */}
                    <Button size="small" href={url}>
                      <strong> Know More</strong>
                    </Button>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Rated : {rated}</Typography>
                      <Typography paragraph>Description:</Typography>
                      <Typography paragraph>{synopsis}</Typography>
                      {/* <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep
                      skillet over medium-high heat. Add chicken, shrimp and
                      chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate
                      and set aside, leaving chicken and chorizo in the pan. Add
                      pimentón, bay leaves, garlic, tomatoes, onion, salt and
                      pepper, and cook, stirring often until thickened and
                      fragrant, about 10 minutes. Add saffron broth and
                      remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with
                      artichokes and peppers, and cook without stirring, until
                      most of the liquid is absorbed, 15 to 18 minutes. Reduce
                      heat to medium-low, add reserved shrimp and mussels,
                      tucking them down into the rice, and cook again without
                      stirring, until mussels have opened and rice is just
                      tender, 5 to 7 minutes more. (Discard any mussels that
                      don’t open.)
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and
                      then serve.
                    </Typography> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Search;

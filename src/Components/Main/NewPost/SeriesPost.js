import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./SeriesPost.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import { FaSkullCrossbones } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

const SeriesPost = ({ updateFeed, handleToggle }) => {
  const classes = useStyles();
  const [rating, setRating] = useState(2.5);
  const [name, setName] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [quote, setQuote] = useState("");
  const [favChar, setFavChar] = useState("");
  const [note, setNote] = useState("");
  const [showBackdrop, setShowBackdrop] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    updateFeed({ name, picUrl, quote, favChar, note, rating });
    handleToggle();
    setShowBackdrop(false);
  };

  return (
    <div>
      <div className={styles.backdropContainer}>
        <div
          className={
            showBackdrop
              ? `${styles.backdrop} ${styles.showBackdrop}`
              : `${styles.backdrop}`
          }
        >
          <Paper className={styles.inputContainer}>
            <div className={styles.cross}>
              <FaSkullCrossbones
                onClick={() => {
                  handleToggle();
                  setShowBackdrop(false);
                }}
              />
            </div>
            <Box style={{ marginLeft: "20px" }} component="fieldset" mb={3}>
              <Typography component="legend">
                Rate is on a scale of shitty to mindblowing
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                precision={0.5}
                size="large"
                onChange={(event, newRating) => {
                  setRating(newRating);
                }}
              />
            </Box>
            <form className={classes.root} onSubmit={submitHandler}>
              {/* <label htmlFor="name">Name</label> */}
              <TextField
                className={styles.text1}
                variant="outlined"
                label="Which awesome Anime?"
                type="text"
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />

              {/* <label htmlFor="pic-url">Picture Url</label> */}
              <TextField
                className={styles.text2}
                variant="outlined"
                label="Pic URL"
                type="text"
                id="pic-url"
                value={picUrl}
                onChange={(event) => {
                  setPicUrl(event.target.value);
                }}
              />

              {/* <label htmlFor="quote">Quote</label> */}
              <br />
              <TextField
                className={styles.text3}
                variant="outlined"
                label="Quote that touched your soul"
                type="text"
                id="quote"
                value={quote}
                onChange={(event) => {
                  setQuote(event.target.value);
                }}
              />

              {/* <label htmlFor="fav-char">Fav Char</label> */}
              <TextField
                className={styles.text4}
                variant="outlined"
                label="Character you simp for?"
                type="text"
                id="fav-char"
                value={favChar}
                onChange={(event) => {
                  setFavChar(event.target.value);
                }}
              />
              <br />

              {/* <label htmlFor="note">Your Viewes</label> */}
              <TextField
                className={styles.text5}
                multiline
                rows={4}
                variant="outlined"
                label="Describe"
                type="text"
                id="note"
                value={note}
                onChange={(event) => {
                  setNote(event.target.value);
                }}
              />
              <br />
              <Button
                className={styles.button}
                variant="contained"
                type="submit"
              >
                Add
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SeriesPost;

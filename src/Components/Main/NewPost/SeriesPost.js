import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./SeriesPost.module.css";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FaSkullCrossbones } from "react-icons/fa";
import firebase from "firebase";
import { db, storage } from "../../../firebase";
import { useGlobalAuthContext } from "../../../AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

const SeriesPost = (props) => {
  const classes = useStyles();
  const [rating, setRating] = useState(2.5);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [quote, setQuote] = useState("");
  const [favChar, setFavChar] = useState("");
  const [note, setNote] = useState("");
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [progress, setProgress] = useState(0);

  const { user } = useGlobalAuthContext();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              favChar: favChar,
              name: name,
              imageUrl: url,
              rating: rating,
              quote: quote,
              note: note,
              username: user.displayName,
            });

            setProgress(0);
            setFavChar("");
            setImage(null);
            setName("");
            setRating(2.5);
            setQuote("");
            setNote("");
            props.handleToggle();
            setShowBackdrop(false);
          });
      }
    );
  };
  // console.log(firebase.firestore.FieldValue.serverTimestamp());

  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   updateFeed({
  //     name,
  //     picUrl,
  //     quote,
  //     favChar,
  //     note,
  //     rating,
  //     likes,
  //     comments,
  //   });
  //   handleToggle();
  //   setShowBackdrop(false);
  // };

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
                  props.handleToggle();
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
            <form className={classes.root}>
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

              {/* <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleChange}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label> */}
              <input type="file" onChange={handleChange} />
              {/* <TextField
                className={styles.text2}
                variant="outlined"
                label="Pic URL"
                type="text"
                id="pic-url"
                value={picUrl}
                onChange={(event) => {
                  setPicUrl(event.target.value);
                }}
              /> */}

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
                onClick={handleUpload}
              >
                Upload
              </Button>
              <progress
                className="imageupload__progress"
                value={progress}
                max="100"
              />
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SeriesPost;

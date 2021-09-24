import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./SeriesPost.module.css";
import TextField from "@material-ui/core/TextField";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FaSkullCrossbones } from "react-icons/fa";
import firebase from "firebase";
import { db, storage } from "../../../firebase";
import { useGlobalAuthContext } from "../../../AuthContext";
import { LinearProgress } from "@material-ui/core";

const CssTextField = styled(TextField)({
  "& > *": {
    color: "white",
    fontSize: "20px",
  },

  "& label.Mui-focused": {
    color: "white",
    fontSize: "20px",
    letterSpacing: "2px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
    fontSize: "20px",
    letterSpacing: "2px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "white",
      fontSize: "20px",
      letterSpacing: "2px",
    },
    "&:hover fieldset": {
      color: "white",
      fontSize: "20px",
      letterSpacing: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      fontSize: "20px",
      letterSpacing: "2px",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  input: {
    color: "#FFF",
    outlineColor: "#FFF",
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
  const [url, setUrl] = useState("");

  const { user } = useGlobalAuthContext();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            //post image inside db
            db.collection("posts").add({
              imageUrl: url,
              favChar: favChar,
              name: name,
              rating: rating,
              quote: quote,
              note: note,
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
            <div className={styles.mainContainer}>
              <div className={styles.containerHeader}>
                <h3>Create your Post</h3>
                <FaSkullCrossbones
                  className={styles.cross}
                  onClick={() => {
                    props.handleToggle();
                    setShowBackdrop(false);
                  }}
                />
              </div>

              <div className={styles.containerName}>
                <div className={styles.userInputWrp}>
                  <br />
                  <input
                    type="text"
                    className={styles.inputText}
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <span className={styles.floatingLabel}>
                    Which Anime (´･ω･`)?
                  </span>
                </div>
              </div>

              <div className={styles.containerQuote}>
                <div className={styles.userInputWrp}>
                  <br />
                  <input
                    type="text"
                    className={styles.inputText}
                    required
                    value={quote}
                    onChange={(event) => {
                      setQuote(event.target.value);
                    }}
                  />
                  <span className={styles.floatingLabel}>
                    Quote that touched your soul ✍(◔◡◔)
                  </span>
                </div>
              </div>

              <div className={styles.containerCharFile}>
                <div
                  style={{ width: "100%", maxWidth: "17rem" }}
                  className={styles.userInputWrp}
                >
                  <br />
                  <input
                    type="text"
                    className={styles.inputText}
                    required
                    value={favChar}
                    onChange={(event) => {
                      setFavChar(event.target.value);
                    }}
                  />
                  <span className={styles.floatingLabel}>
                    Character you simp for (❁´◡`❁)
                  </span>
                </div>

                <div className={styles.fileInput}>
                  <label htmlFor="ffile">
                    {" "}
                    <Button
                      variant="contained"
                      component="span"
                      // style={{ width: "100%" }}
                      style={{
                        backgroundColor: "#FF9F1C",
                        fontSize: "0.9rem",
                        color: "black",
                        fontWeight: "bold",
                        letterSpacing: "0.9px",
                      }}
                    >
                      Upload a Pic
                    </Button>
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="ffile"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.note}>
                <div className={styles.userInputWrp}>
                  <br />
                  <input
                    type="text"
                    className={styles.inputText}
                    required
                    value={note}
                    onChange={(event) => {
                      setNote(event.target.value);
                    }}
                  />
                  <span className={styles.floatingLabel}>
                    Note ...( ＿ ＿)ノ｜
                  </span>
                </div>
              </div>

              <div className={styles.containerProgress}>
                {/* <progress
                  className="imageupload__progress"
                  value={progress}
                  max="100"
                /> */}
                <LinearProgress variant="determinate" value={progress} />
              </div>

              <Button
                style={{
                  backgroundColor: "#FF9F1C",
                  fontSize: "1rem",
                  color: "black",
                  fontWeight: "bold",
                  letterSpacing: "0.9px",
                  marginRight: "20px",
                }}
                variant="contained"
                type="submit"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SeriesPost;

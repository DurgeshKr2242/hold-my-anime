import React, { useState, useEffect } from "react";
import styles from "./SingleSeriesPost.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { SiGooglecalendar } from "react-icons/si";
import { BiTime } from "react-icons/bi";
import { db } from "../../firebase";
import firebase from "firebase";
import { useGlobalAuthContext } from "../../AuthContext";
import { Button, Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const SingleSeriesPost = ({
  name,
  imageUrl,
  quote,
  favChar,
  note,
  rating,
  likes,
  date,
  username,
  postId,
}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useGlobalAuthContext();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <>
      <div className={styles.mainFeedContainer}>
        <div className={styles.feedContainer}>
          <div className={styles.name}>
            <div className={styles.separator}>
              <div className={styles.line}></div>
              <h1>{name}</h1>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <img src={imageUrl} alt="My Cover Pic" />
              <p style={{ color: "rgb(117, 117, 117)" }}>
                Posted <br />
                By: {username} <br />
                <SiGooglecalendar />: {date} <br />
                <BiTime />:{" "}
                {new Date().getHours() + ":" + new Date().getMinutes()}
              </p>
            </div>
            <div className={styles.col2}>
              {quote && (
                <div className={styles.quote}>
                  <FaQuoteLeft /> {quote} <FaQuoteRight />
                </div>
              )}
              {favChar && (
                <p>
                  I believe in <b> {favChar}'s </b> Supremecy
                </p>
              )}
              <div className="rating">
                <p>
                  It deserves <b> {rating}</b> <AiFillStar /> according to me.
                </p>
              </div>
              <div className="hr">
                <hr />
              </div>
              <div className="note">
                <p>
                  <BsChatSquareQuoteFill /> {note}
                </p>
              </div>
            </div>
          </div>

          <div className="actionView">
            <p>Love Recived : {likes}</p>
          </div>
        </div>
        {comments.length > 0 && (
          <div className={styles.commentsContainer}>
            {comments.map((comment) => {
              return (
                <p key={comment.text}>
                  <b>{comment.username}</b> {comment.text}
                </p>
              );
            })}
          </div>
        )}

        {user && (
          <form className="post__commentBox">
            {/* <Input
              className={styles.formInput}
              placeholder="Add a comment..."
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            /> */}
            <Input
              sx={{
                m: 1,
                width: "100%",
                paddingTop: "10px",
                paddingRight: "10px",
              }}
              id="standard-adornment-amount"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    style={{ padding: "10px", marginBottom: "10px" }}
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            />
            {/* <input
              type="text"
              className="post__input"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            /> */}
            {/* <button
              className="post__button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Post
            </button> */}
          </form>
        )}
      </div>
    </>
  );
};

export default SingleSeriesPost;

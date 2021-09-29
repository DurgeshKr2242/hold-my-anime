import React, { useState, useEffect, forwardRef } from "react";
import styles from "./SingleSeriesPost.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import firebase from "firebase";
import { useGlobalAuthContext } from "../../AuthContext";
import { Button, Input } from "@material-ui/core";
import { OutlinedInput } from "@mui/material";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { db, storage } from "../../firebase";
import { RiEditBoxFill } from "react-icons/ri";
import EditSeriesPost from "./NewPost/EditSeriesPost";

const SingleSeriesPost = forwardRef(
  ({ name, imageUrl, quote, favChar, note, rating, username, postId }, ref) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const { user } = useGlobalAuthContext();
    const [backdropOpen, setBackdropOpen] = useState(false);

    console.log(user);

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

    const handleDelete = () => {
      db.collection("posts")
        .doc(postId)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    };

    const handleToggle = () => {
      setBackdropOpen(!backdropOpen);
    };

    return (
      <div className={styles.mainFeedContainer} ref={ref}>
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
            </div>
            <div className={styles.col2}>
              <div className={styles.topText}>
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
              </div>
            </div>
          </div>
          <div>
            <p className={styles.note}>
              <BsChatSquareQuoteFill /> {note}
            </p>
          </div>
          <p style={{ color: "#0e385a", textAlign: "right" }}>
            &#8212; Posted By: {username} <br />
          </p>

          {username === user?.displayName && (
            <div className={styles.modifyArea}>
              <Button
                style={{ padding: "8px 20px", margin: "0", margin: "auto" }}
                onClick={handleDelete}
              >
                <RiDeleteBin6Fill
                  style={{
                    fontSize: "20px",
                  }}
                />
                Delete
              </Button>
              <Button
                style={{ padding: "8px 20px", margin: "0", margin: "auto" }}
                onClick={handleToggle}
              >
                <RiEditBoxFill
                  style={{
                    fontSize: "20px",
                  }}
                />
                Edit
              </Button>
            </div>
          )}

          {comments.length ? (
            <>
              <div className={styles.totalComments}>
                <p>Total {comments.length} comments</p>
              </div>
              <div className={styles.commentsContainer}>
                {comments.map((comment) => (
                  <p>
                    <b>{comment.username}</b> {comment.text}
                  </p>
                ))}
              </div>
            </>
          ) : (
            ""
          )}

          {user && (
            <form className="post__commentBox">
              <OutlinedInput
                style={{ width: "100%" }}
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                endAdornment={
                  <Button
                    disabled={!comment}
                    style={{ color: `${comment ? "#E71D36" : ""}` }}
                    type="submit"
                    onClick={postComment}
                  >
                    Post
                  </Button>
                }
              />
            </form>
          )}
        </div>

        <div className="backdrop">
          {backdropOpen && (
            <EditSeriesPost
              handleToggle={handleToggle}
              name={name}
              imageUrl={imageUrl}
              quote={quote}
              favChar={favChar}
              note={note}
              rating={rating}
              username={username}
              postId={postId}
            />
          )}
        </div>
      </div>
    );
  }
);

export default SingleSeriesPost;

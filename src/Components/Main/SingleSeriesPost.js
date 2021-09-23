import React, { useState, useEffect, forwardRef } from "react";
import styles from "./SingleSeriesPost.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { db } from "../../firebase";
import firebase from "firebase";
import { useGlobalAuthContext } from "../../AuthContext";

const SingleSeriesPost = forwardRef(
  (
    {
      name,
      imageUrl,
      quote,
      favChar,
      note,
      rating,
      // likes,
      // date,
      username,
      postId,
    },
    ref
  ) => {
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
              <p style={{ color: "rgb(117, 117, 117)" }}>
                Posted <br />
                By: {username} <br />
                {/* <SiGooglecalendar />: {date} <br />
                  <BiTime />:{" "}
                  {new Date().getHours() + ":" + new Date().getMinutes()} */}
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
        </div>

        <div className={styles.commentsContainer}>
          {comments.map((comment) => (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
          ))}
        </div>

        {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment}
              className="post__button"
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
      </div>
    );
  }
);

export default SingleSeriesPost;

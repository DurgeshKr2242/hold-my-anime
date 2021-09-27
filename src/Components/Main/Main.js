import React, { useState, useEffect } from "react";
import NewPost from "./NewPost/NewPost";
import styles from "./Main.module.css";
import SingleSeriesPost from "./SingleSeriesPost";
import FlipMove from "react-flip-move";
import { db } from "../../firebase";

const Main = () => {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );

    // setLoading(false);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.newPostContainer}>
        <NewPost />
      </div>

      <div className={styles.feedss}>
        <FlipMove>
          {posts.map(({ id, post }) => {
            // var today = new Date(),
            //   date =
            //     today.getFullYear() +
            //     "-" +
            //     (today.getMonth() + 1) +
            //     "-" +
            //     today.getDate();
            return (
              <SingleSeriesPost
                name={post.name}
                imageUrl={post.imageUrl}
                quote={post.quote}
                favChar={post.favChar}
                note={post.note}
                key={id}
                postId={id}
                rating={post.rating}
                // likes={post.likes}
                // date={date}
                username={post.username}
              />
            );
          })}
        </FlipMove>
      </div>
    </div>
  );
};

export default Main;

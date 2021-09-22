import React from "react";
import NewPost from "./NewPost/NewPost";
import styles from "./Main.module.css";
import SingleSeriesPost from "./SingleSeriesPost";

const Main = (props) => {
  const likesHandler = () => {};
  const commentsHandler = () => {};

  return (
    <div className={styles.mainContainer}>
      <NewPost
        // updateFeed={updateFeedHandler}
        likesHandler={likesHandler}
        commentsHandler={commentsHandler}
      />

      <div className={styles.feedss}>
        {props.posts.map(({ id, post }) => {
          var today = new Date(),
            date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
          // console.log("hii");
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
              likes={post.likes}
              date={date}
              username={post.username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Main;

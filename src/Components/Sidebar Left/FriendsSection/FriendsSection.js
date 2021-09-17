import { Paper } from "@material-ui/core";
import React from "react";
import friendsData from "./FriendsData";
import Friend from "./Friend";
import styles from "./FriendsSection.module.css";

const FriendsSection = () => {
  const friends = [...friendsData];
  return (
    <>
      <Paper elevation={5} className={styles.mainContainer}>
        {friends.map((data) => {
          console.log("HELLO");
          const { name, watching, likes } = data;
          return (
            <div className={styles.friendContainer}>
              <Friend name={name} watching={watching} likes={likes} />
            </div>
          );
        })}
      </Paper>
    </>
  );
};

export default FriendsSection;

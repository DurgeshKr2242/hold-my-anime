import { Button, Paper } from "@material-ui/core";
import React from "react";
import data from "./ProfileData";
import styles from "./ProfileBanner.module.css";

const ProfileBanner = () => {
  const {
    name,
    pfpUrl,
    status,
    watching,
    totalEntries,
    avgRating,
    totalFriends,
  } = data;
  return (
    <>
      <Paper className={styles.profileContainer} elevation={5}>
        <div className={styles.pfp}>
          <img src={pfpUrl} alt="" />
        </div>
        <div className={styles.pfpInfo}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.status}>{status}</p>
        </div>
        <hr />
        <div className={styles.desc}>
          <p className="watching">
            <b>Watching</b> : {watching}
          </p>
          <p className={styles.entries}>
            <b>Total Entries</b> : {totalEntries}
          </p>
          <p className={styles.rating}>
            <b>Avg. Rating</b> : {avgRating}
          </p>
        </div>

        <div className={styles.friendContainer}>
          <Button
            className={styles.button}
            variant="contained"
            color="secondary"
          >
            Friends : {totalFriends}
          </Button>
          <Button
            className={styles.button}
            variant="contained"
            color="secondary"
          >
            Add Friend{" "}
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default ProfileBanner;

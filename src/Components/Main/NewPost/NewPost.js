import React, { useState } from "react";
import styles from "./NewPost.module.css";
import { Button, Paper } from "@material-ui/core";
import SeriesPost from "./SeriesPost";

const NewPost = ({ updateFeed }) => {
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleToggle = () => {
    setBackdropOpen(!backdropOpen);
  };

  return (
    <Paper
      elevation={3}
      style={{ maxWidth: "600px", padding: "20px", overflow: "hidden" }}
    >
      <button
        type="text"
        className={styles.newPostButton}
        placeholder="Create New Post"
      >
        Add New Post
      </button>
      <div className={styles.buttonArea}>
        <Button variant="contained" color="secondary" onClick={handleToggle}>
          Series/Season Flex
        </Button>
      </div>
      <div className="backdrop">
        {backdropOpen && (
          <SeriesPost updateFeed={updateFeed} handleToggle={handleToggle} />
        )}
      </div>
    </Paper>
  );
};

export default NewPost;

import React, { useState } from "react";
import styles from "./NewPost.module.css";
import { Button, Paper } from "@material-ui/core";
import SeriesPost from "./SeriesPost";
import { useGlobalAuthContext } from "../../../AuthContext";
import FlipMove from "react-flip-move";

const NewPost = (props) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { user } = useGlobalAuthContext();
  const [postArea, setPostArea] = useState(false);

  const handleToggle = () => {
    setBackdropOpen(!backdropOpen);
  };

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "600px",
        padding: "20px",
        overflow: "hidden",
        backgroundColor: "#1f7e74",
      }}
    >
      <button
        type="text"
        className={styles.newPostButton}
        placeholder="Create New Post"
        onClick={() => setPostArea(!postArea)}
      >
        Add New Post
      </button>
      <FlipMove>
        {postArea && (
          <div className={styles.buttonArea}>
            {user?.displayName ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#E71D36",
                  color: "white",
                  fontSize: "0.9rem",
                  letterSpacing: "1px",
                }}
                onClick={handleToggle}
              >
                Series/Season Flex
              </Button>
            ) : (
              ""
            )}
          </div>
        )}
      </FlipMove>

      <div className="backdrop">
        {backdropOpen && <SeriesPost handleToggle={handleToggle} />}
      </div>
    </Paper>
  );
};

export default NewPost;

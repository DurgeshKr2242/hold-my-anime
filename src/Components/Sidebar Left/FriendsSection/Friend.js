import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Friend.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const Friend = (props) => {
  const [totalLikes, setTotalLikes] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  const clickHandler = () => {
    setLiked(!liked);
    if (totalLikes === props.likes) {
      setTotalLikes(totalLikes + 1);
    } else {
      setTotalLikes(totalLikes - 1);
    }
  };
  return (
    <>
      <div className={styles.pfpInfo}>
        <h3 className={styles.name}>{props.name}</h3>
      </div>
      <hr style={{ width: "100%", minWidth: "300px" }} />
      <div className={styles.desc}>
        <p className="watching">
          <b>Watching</b> : {props.watching}
        </p>

        <p className={styles.entries}>
          <Button style={{ padding: "0", margin: "0" }} onClick={clickHandler}>
            {liked ? <AiFillLike /> : <AiOutlineLike />}
          </Button>
          {totalLikes} people liked you choice
        </p>
      </div>
    </>
  );
};

export default Friend;

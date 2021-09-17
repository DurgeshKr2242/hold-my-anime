import React, { useState } from "react";
import NewPost from "./NewPost/NewPost";
import Seeds from "./Data";
import styles from "./Main.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { SiGooglecalendar } from "react-icons/si";
import { BiTime } from "react-icons/bi";

const Main = () => {
  const [feed, setFeed] = useState(Seeds);

  const updateFeedHandler = ({
    name,
    picUrl,
    quote,
    favChar,
    note,
    rating,
  }) => {
    const newData = { name, picUrl, quote, favChar, note, rating };
    setFeed([newData, ...feed]);
  };

  return (
    <div className={styles.mainContainer}>
      <div className="newPostContainer">
        <NewPost updateFeed={updateFeedHandler} />
      </div>
      <div className={styles.feedss}>
        {feed.map((data) => {
          const { name, picUrl, quote, favChar, note, id, rating } = data;
          var today = new Date(),
            date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();

          return (
            <div key={id} className={styles.feedContainer}>
              <div className={styles.name}>
                <div class={styles.separator}>
                  <div class={styles.line}></div>
                  <h1>{name}</h1>
                  <div class={styles.line}></div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <img src={picUrl} alt="My Cover Pic" />
                  <p style={{ color: "rgb(117, 117, 117)" }}>
                    Posted <br />
                    By: Durgesh Kumar <br />
                    <SiGooglecalendar />: {date} <br />
                    <BiTime />:{" "}
                    {new Date().getHours() + ":" + today.getMinutes()}
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
                      It deserves <b> {rating}</b> <AiFillStar /> according to
                      me.
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
          );
        })}
      </div>
    </div>
  );
};

export default Main;

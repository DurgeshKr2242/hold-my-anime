import React, { useState, useEffect } from "react";
import styles from "./RandomQuote.module.css";
import axios from "axios";
const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios("https://animechan.vercel.app/api/random")
      .then((res) => {
        setQuote(res.data);
      })
      .catch((error) => {
        console.error("error fetching data ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        // <h1>Loading...</h1>
        <div className={styles.loader}>
          <div className={`${styles.duo} ${styles.duo1}`}>
            <div className={`${styles.dot} ${styles.dota}`}></div>
            <div className={`${styles.dot} ${styles.dotb}`}></div>
          </div>
          <div className={`${styles.duo} ${styles.duo2}`}>
            <div className={`${styles.dot} ${styles.dota}`}></div>
            <div className={`${styles.dot} ${styles.dotb}`}></div>
          </div>
        </div>
      ) : (
        <div className={styles.secContainer}>
          <h3 className={styles.quote}>
            <q>{quote.quote}</q>
          </h3>
          <div className={styles.char}>
            <p>
              <cite> -{quote.character} </cite>
            </p>
          </div>
          <h3 className={styles.animeName}>{quote.anime}</h3>
        </div>
      )}
    </div>
  );
};

export default RandomQuote;

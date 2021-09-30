import { Button, Paper } from "@material-ui/core";
import React from "react";
import data from "./ProfileData";
import styles from "./ProfileBanner.module.css";
import { useGlobalAuthContext } from "../../../AuthContext";
const ProfileBanner = () => {
  const { user } = useGlobalAuthContext();
  // const [name, setName] = useState(username);
  const { pfpUrl, status, watching, totalEntries, avgRating, totalFriends } =
    data;
  return (
    <>
      {/* {console.log("hii")} */}
      <div className={styles.mainProfileBannerContainer}>
        <Paper elevation={5} style={{ background: "#2ec4b6" }}>
          <div className={styles.profileContainer}>
            <div className={styles.separator}>
              <div className={styles.line}></div>
              <div className={styles.pfp}>
                <img src={pfpUrl} alt="" />
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.pfpInfo}>
              <h3 className={styles.name}>{user ? user.displayName : ""}</h3>
              <p className={styles.status}>{status}</p>
            </div>

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
                variant="contained"
                style={{
                  backgroundColor: "#E71D36",
                  fontSize: "11px",
                  color: "white",
                  // fontWeight: "bold",
                  // letterSpacing: "0.9px",
                  marginRight: "10px",
                }}
              >
                View your List
              </Button>
              {/* <Button
                variant="contained"
                style={{
                  backgroundColor: "#E71D36",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: "0.9px",
                  marginRight: "10px",
                }}
              >
                Add Friend{" "}
              </Button> */}
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ProfileBanner;

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Input } from "@mui/material";
import { useGlobalAuthContext } from "../../AuthContext";
import styles from "./LoginSignup.module.css";
import logo from "./Logo.svg";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #F3F2EF",
  boxShadow: 24,
  p: 4,
};

function LoginSignup() {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
  } = useGlobalAuthContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User Has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //User has logged out
        setUser(null);
      }
    });
    return () => {
      //cleanup
      unsubscribe();
    };
  }, [user, username]);
  // console.log(user);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  // console.log("hello");

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className={styles.formContainer}>
            <center>
              <div className="app__header">
                <img className={styles.formLogo} src={logo} alt="" />
              </div>
            </center>
            {/* ----------- */}
            {/* <TextField
              style={{ marginTop: "20px" }}
              className={styles.formInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="standard-basic"
              label="Username"
              variant="standard"
            />
            <TextField
              style={{ marginTop: "20px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              id="standard-basic"
              type="email"
              label="Email"
              variant="standard"
            />
            <TextField
              style={{ marginTop: "20px" }}
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="standard-basic"
              type="password"
              label="Password"
              variant="standard"
            /> */}
            <Input
              className={styles.formInput}
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className={styles.formInput}
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className={styles.formInput}
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className={styles.btnn} onClick={signUp}>
              SignUp
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          <form className={styles.formContainer}>
            <center>
              <div className="app__header">
                <img className={styles.formLogo} src={logo} alt="" />
              </div>
            </center>

            <Input
              className={styles.formInput}
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className={styles.formInput}
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className={styles.btnn} onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>

      {user ? (
        <Button variant="contained" onClick={() => auth.signOut()}>
          Log Out
        </Button>
      ) : (
        <div className="app__loginContainer">
          <Button variant="contained" onClick={() => setOpenSignIn(true)}>
            Sign In
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>
            SignUp
          </Button>
        </div>
      )}
    </>
  );
}

export default LoginSignup;

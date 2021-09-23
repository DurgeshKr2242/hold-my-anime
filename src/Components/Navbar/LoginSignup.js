import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Input } from "@mui/material";
import { useGlobalAuthContext } from "../../AuthContext";
import styles from "./LoginSignup.module.css";
import logo from "./Logo.svg";

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
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  // console.log("hello");

  return (
    <>
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
            <Button className={styles.btnn} onClick={handleLogin}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className={styles.formContainer}>
            <center>
              <div className="app__header">
                <img className={styles.formLogo} src={logo} alt="" />
              </div>
            </center>
            {/* ----------- */}

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
            <Button className={styles.btnn} onClick={handleRegister}>
              Register
            </Button>
          </form>
        </Box>
      </Modal>

      {user?.displayName ? (
        <Button variant="contained" onClick={() => auth.signOut()}>
          LogOut
        </Button>
      ) : (
        <div className="app__loginContainer">
          <Button variant="contained" onClick={() => setOpenSignIn(true)}>
            LogIn
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

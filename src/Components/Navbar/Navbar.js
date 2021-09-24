import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "./loogoo11.png";
import Modal from "@mui/material/Modal";
import LoginSignup from "./LoginSignup";
import { Box } from "@mui/system";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "@material-ui/core";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const [visible, setVisible] = useState(false);

  const toggleVisibleScrollToTop = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
           in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisibleScrollToTop);

  const toggleVisible = () => {
    if (window.scrollY > 0) {
      setNavScrolled(true);
    } else {
      setNavScrolled(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box>
          <LoginSignup />
        </Box>
      </Modal>
      {/* <header className={styles.header}> */}
      <div className={`${styles.navbar} ${navScrolled ? styles.sticky : ""}`}>
        <img className={styles.logo} src={logo} alt="LOGO" />
        <nav className={styles.navv}>
          <ul>
            <li>
              <LoginSignup />
            </li>
          </ul>
        </nav>
        <Button
          style={{
            position: "fixed",
            width: "100%",
            left: "40%",
            bottom: "40px",
            height: "20px",
            fontSize: "2rem",
            cursor: "pointer",
            color: "#E71D36",
            zIndex: "1",
          }}
        >
          <FaArrowCircleUp
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
          />
        </Button>
      </div>
      {/* </header> */}
    </>
  );
};

export default Navbar;

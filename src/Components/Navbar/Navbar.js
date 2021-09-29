import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Modal from "@mui/material/Modal";
import LoginSignup from "./LoginSignup";
import { Box } from "@mui/system";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./nav.css";

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
      {/* <div className={`${styles.navbar} ${navScrolled ? styles.sticky : ""}`}>
        <img className={styles.logo} src={logo} alt="LOGO" />
        <nav className={styles.navv}>
          <ul>
            <li>
              <LoginSignup />
            </li>
          </ul>

        </nav> */}

      <nav class={`navbar ${navScrolled ? "sticky" : ""}`}>
        <div class="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            <li>
              <Link to="/">
                <a>Home</a>
              </Link>
            </li>
            {/* <li>
              <a href="#about">About</a>
            </li>

            <li>
              <a href="#food-menu">Menu</a>
            </li>
            <li>
              <a href="#testimonials">Testimonial</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li> */}
            <li>
              <Link to="/search">
                <a href="#food">Search</a>
              </Link>
            </li>
            <li>
              <LoginSignup />
            </li>
          </ul>
          <h1 class="logo">HoldMyAnime</h1>
        </div>

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
      </nav>
      {/* </div> */}
      {/* </header> */}
    </>
  );
};

export default Navbar;

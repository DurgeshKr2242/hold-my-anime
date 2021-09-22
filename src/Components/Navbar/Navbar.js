import React, { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import styles from "./Navbar.module.css";
import logo from "./Logo.svg";
import Modal from "@mui/material/Modal";
import LoginSignup from "./LoginSignup";
import { Box } from "@mui/system";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box>
          <LoginSignup />
        </Box>
      </Modal>
      <div className={styles.navbar}>
        <img className={styles.logo} src={logo} alt="LOGO" />
        <nav className={styles.navv}>
          <ul>
            <li>
              <LoginSignup />
            </li>
          </ul>
        </nav>
        <div className={styles.user}>
          <FaUserSecret />
        </div>
      </div>
    </>
  );
};

export default Navbar;

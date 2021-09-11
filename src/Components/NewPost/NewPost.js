import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./NewPost.module.css";
import { Paper } from "@material-ui/core";

const currencies = [
  {
    value: "Photo",
    label: "Photo",
  },
  {
    value: "Flex",
    label: "Flex",
  },
  {
    value: "Completed series/season",
    label: "Completed series/season",
  },
  {
    value: "Review",
    label: "Review",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const NewPost = () => {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("Completed series/season");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Paper elevation={3} style={{ maxWidth: "600px", padding: "20px" }}>
      <button
        type="text"
        className={styles.newPost}
        placeholder="Create New Post"
      >
        Add New Post
      </button>
      <div className={styles.buttonArea}>
        {/* <button>Photo</button>
        <button>Flex</button>
        <button>Completed Series/Season</button>
        <button>Review</button> */}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-select-currency"
            select
            label="Select Your Forte"
            value={currency}
            onChange={handleChange}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </div>
    </Paper>
  );
};

export default NewPost;

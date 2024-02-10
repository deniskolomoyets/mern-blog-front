import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const imageUrl = "";
  const [value, setValue] = React.useState(""); //value - save what I wrote in editor(simplemde)
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []); //controlled editor. use useCallback because it's library feature

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  ); //editor settings

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  } //if you're not logged in, go to the home page

  console.log({ title, tags, value });
  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Download preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article headline..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};

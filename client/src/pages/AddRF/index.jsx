import React from "react";
import TextField from "@mui/material/TextField";
import "easymde/dist/easymde.min.css";
import styles from "./AddRF.module.css";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddRF = () => {
  const isAuth = useSelector(selectIsAuth);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [downloadLink, setDownloadLink] = React.useState("");
  const [parseLink, setParseLink] = React.useState("");

  const onSubmit = async () => {
    try {
      let newParse;
      let newDownload;

      if (downloadLink.indexOf("uc?export") + downloadLink.indexOf("/d/") === -2) {
        window.alert("Посилання (надати доступ іншим) невірне");
      }
      if (parseLink.indexOf("<iframe") + parseLink.indexOf("document/d/") === -2) {
        window.alert("Посилання (опублікувати в інтернеті) невірне");
      }

      if (downloadLink.indexOf("uc?export") === -1) {
        const from = downloadLink.indexOf("/d/") + 3;
        const to = downloadLink.indexOf("/edit");
        newDownload = "https://drive.google.com/uc?export=download&id=" + downloadLink.slice(from, to);
      } else {
        newDownload = downloadLink;
      }

      if (parseLink.indexOf("<iframe") === -1) {
        newParse = '<iframe src="' + parseLink + '?embedded=true" width="500px" height="500px"></iframe>';
      } else {
        newParse = parseLink;
      }

      const fields = {
        title,
        downloadLink: newDownload,
        parseLink: newParse,
      };

      const { data } = isEditing
        ? await axios.patch(`/regulatory_framework/${id}`, fields)
        : await axios.post("/regulatory_framework", fields);

      const _id = isEditing ? id : data._id;

      navigate("/regulatory_framework");
    } catch (e) {
      alert("Невдалося зберегти");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/regulatory_framework/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setDownloadLink(data.downloadLink);
          setParseLink(data.parseLink);
        })
        .catch((e) => {
          alert("Проблема з редагуванням");
        });
    }
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.all}>
      <div className={styles.allBlock}>
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статті..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.downloadLink }}
          variant="standard"
          placeholder="Посилання з НАДАТИ ДОСТУП ІНШИМ"
          value={downloadLink}
          onChange={(e) => setDownloadLink(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.parseLink }}
          variant="standard"
          placeholder="Посилання з ОПУБЛІКУВАТИ В ІНТЕРНЕТІ"
          value={parseLink}
          onChange={(e) => setParseLink(e.target.value)}
          fullWidth
        />

        <div className={styles.buttons}>
          <button onClick={onSubmit} className={styles.save}>
            Зберегти
          </button>
          <button
            className={styles.upload}
            onClick={() => {
              navigate("/regulatory_framework");
            }}
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

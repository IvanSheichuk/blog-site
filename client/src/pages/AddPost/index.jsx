import React from "react";
import TextField from "@mui/material/TextField";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const inputPreview = React.useRef(null);
  const inputPhoto = React.useRef(null);

  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState([]);

  const uploadPreview = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/files/upload", formData);
      setPreviewUrl(data.url);
    } catch (e) {
      alert("Неочікувана помилка завантаження прев'ю");
    }
  };

  const uploadPhoto = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/files/upload", formData);
      setPhotoUrl((arr) => [...arr, data.url]);
    } catch (e) {
      alert("Неочікувана помилка завантаження фото");
    }
  };

  const RemovePreview = async () => {
    const pic = previewUrl;
    await axios.delete(`/files/remove${pic}`);
    await setPreviewUrl("");
  };

  const RemovePhoto = async (photo) => {
    await axios.delete(`/files/remove${photo}`);
    await setPhotoUrl(photoUrl.filter((p) => p !== photo));
  }

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  function upTags(words) {
    return words.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
  }

  async function makeFieldVideo(val) {
    let parent = document.querySelector("#videoInput");
    let input = document.createElement("input");
    input.className = "styles.inputVideo";
    input.type = "text";
    input.placeholder = "Посилання на ВІДЕО";
    if (typeof val !== "string") {
      val = "";
    }
    input.value = val;

    await parent.appendChild(input);
  }

  async function makeFieldFile(val) {
    let parent = document.querySelector("#fileInput");
    let input = document.createElement("input");
    input.className = "styles.inputFile";
    input.type = "text";
    input.placeholder = "Посилання на ФАЙЛ   (з опублікувати в інтернеті)";
    if (typeof val !== "string") {
      val = "";
    }
    input.value = val;

    await parent.appendChild(input);
  }

  function getVideo() {
    if (document.getElementsByClassName("styles.inputVideo")[0]) {
      let i = 0;
      let arrVid = [];
      do {
        let element =
          document.getElementsByClassName("styles.inputVideo")[i].value;

        let from = element.indexOf("=") + 1;
        let to = element.indexOf("&");
        if (to === -1) {
          to = element.length;
        }
        let endElement;

        if (element[0] === "<") {
          endElement = element;
        } else {
          endElement =
            '<iframe width="500" height="300" src="http://www.youtube.com/embed/' +
            element.slice(from, to) +
            '"></iframe>';
        }

        if (from !== 0) {
          arrVid.push(endElement);
        }
        i = i + 1;
      } while (document.getElementsByClassName("styles.inputVideo")[i]);

      return arrVid;
    } else {
      return [];
    }
  }

  function getFile() {
    if (document.getElementsByClassName("styles.inputFile")[0]) {
      let i = 0;
      let arrVid = [];
      do {
        let element =
          document.getElementsByClassName("styles.inputFile")[i].value;
        let endElement;

        if (element[0] === "<") {
          endElement = element;
        } else {
          endElement =
            '<iframe src="' +
            element +
            '?embedded=true" width="500px" height="500px"></iframe>';
        }

        if (element.length > 10) {
          arrVid.push(endElement);
        }
        i = i + 1;
      } while (document.getElementsByClassName("styles.inputFile")[i]);

      return arrVid;
    } else {
      return [];
    }
  }

  const onSubmit = async () => {
    try {
      if (!previewUrl || !title) {
        throw new Error("Стаття повинна містити прев'ю та заголовок");
      }

      const words = upTags(tags.toString().split(" ").join("").split(","));
      const videoArr = getVideo();
      const fileArr = getFile();

      const fields = {
        title,
        text,
        tags: words,
        previewUrl: previewUrl,
        videoUrl: videoArr,
        fileUrl: fileArr,
        photoUrl,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (e) {
      alert(e.message);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setPreviewUrl(data.previewUrl);
          setTags(data.tags);
          if (data.videoUrl !== []) {
            for (let i = 0; i < data.videoUrl.length; i++) {
              makeFieldVideo(data.videoUrl[i]);
            }
          }
          if (data.fileUrl !== []) {
            for (let i = 0; i < data.fileUrl.length; i++) {
              makeFieldFile(data.fileUrl[i]);
            }
          }
          if (data.photoUrl !== []) {
            setPhotoUrl(data.photoUrl);
          }
        })
        .catch((e) => {
          alert("Невдалося отримати дані");
        });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введіть текст...",
      status: false,
      toolbarTips: false,
      toolbar: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <div className={styles.all}>
      <div className={styles.leftBlock}>
        {!previewUrl ? (
          <>
            <button
              className={styles.uploadPreview}
              onClick={() => inputPreview.current.click()}
            >
              Загрузити прев’ю
            </button>
            <input
              ref={inputPreview}
              type="file"
              onChange={uploadPreview}
              hidden
            />
          </>
        ) : (
          <>
            <img
              className={styles.preview}
              src={process.env.REACT_APP_BASE_URL + previewUrl}
              alt="Uploaded"
            />
            <IconButton
              className={styles.iconPreview}
              onClick={RemovePreview}
            >
              <DeleteIcon className={styles.delPreview} />
            </IconButton>
          </>
        )}

        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статті..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Теги"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <button onClick={onSubmit} className={styles.save}>
            Зберегти
          </button>
          <button
            className={styles.uploadPreview}
            onClick={() => {
              navigate("/posts");
            }}
          >
            Скасувати
          </button>
        </div>
      </div>

      <div className={styles.rightBlock}>
        <button onClick={makeFieldVideo}>Додати відео</button>
        <button onClick={makeFieldFile}>Додати файл</button>

        <button onClick={() => inputPhoto.current.click()}>
          Загрузити фото
        </button>
        <input
          ref={inputPhoto}
          type="file"
          onChange={uploadPhoto}
          hidden
        />

        <div className={styles.photoOutput}>
          {photoUrl.map((name) => (
            <div className={styles.blockPhoto}>
              <img
                className={styles.photo}
                alt=""
                src={process.env.REACT_APP_BASE_URL + name}
              />
              <IconButton
                className={styles.iconPic}
                onClick={() => RemovePhoto(name)}
              >
                <DeleteIcon className={styles.delPic} />
              </IconButton>
            </div>
          ))}
        </div>

        <div id="videoInput" className={styles.video}></div>
        <div id="fileInput" className={styles.file}></div>
      </div>
    </div>
  );
};

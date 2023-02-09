import React from "react";
import { Link, useParams } from "react-router-dom";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import axios from "../../axios";
import styles from "./FullPost.module.css";
import { PostSkeleton } from "../../components/Post/Skeleton";
import { FileBlock, ImgBlock, VideoBlock } from "../../components";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className={styles.all}>
      <div className={styles.root}>
        <div className={styles.leftBlock}>
          {data.previewUrl
              ? <img
                      className={styles.preview}
                      src={process.env.REACT_APP_BASE_URL + data.previewUrl}
                      alt={data.title}
                  />
              : ""
          }
          <div className={styles.wrapper}>
            <div className={styles.indention}>
              <h2 className={styles.title}>{data.title}</h2>
              <ul className={styles.tags}>
                {data.tags.map((name) => (
                  <li key={name}>
                    <Link to={`/tags/${name}`}>#{name}</Link>
                  </li>
                ))}
              </ul>

              <p>{data.text}</p>

              <div className={styles.postDetails}>
                <EyeIcon />
                <span>{data.viewsCount}</span>
              </div>
            </div>
          </div>
        </div>
        {data.videoUrl ? <VideoBlock videoUrl={data.videoUrl} /> : ""}
        {data.photoUrl ? <ImgBlock imgUrl={data.photoUrl} /> : ""}
        <div className={styles.file}>
          {data.fileUrl ? <FileBlock fileUrl={data.fileUrl} /> : ""}
        </div>
      </div>
    </div>
  );
};

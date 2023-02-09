import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import styles from "./Post.module.css";
import { PostSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemovePost } from "../../redux/slices/posts";

export const Post = ({
  _id,
  title,
  previewUrl,
  viewsCount,
  tags,
  children,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Ви точно хочете видалити цю статтю?")) {
      dispatch(fetchRemovePost(_id));
    }
  };

  return (
    <div className={styles.root}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton>
              <EditIcon color="disabled" />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove}>
            <DeleteIcon color="disabled" />
          </IconButton>
        </div>
      )}
      {previewUrl &&
        <img
          className={styles.image}
          src={process.env.REACT_APP_BASE_URL + previewUrl}
          alt={title}
        />
      }
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2 className={styles.title}>
            <Link to={`/posts/${_id}`}>{title}</Link>
          </h2>
          <ul className={styles.tags}>
            {tags.map((name, index) => (
              <li key={index}>
                <Link to={`/tags/${name}`}>
                  #{name}
                </Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

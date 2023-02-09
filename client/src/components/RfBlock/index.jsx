import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./RfBlock.module.css";
import { RFSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemoveRegulatoryFramework } from "../../redux/slices/regulatoryFramework";

export const RfBlock = ({
  _id,
  title,
  downloadLink,
  parseLink,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <RFSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Ви точно хочете видалити цю статтю?" + "   " + _id)) {
      dispatch(fetchRemoveRegulatoryFramework(_id));
    }
  };

  return (
    <div className={styles.root}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/regulatory_framework/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <div className={styles.title}>{title}</div>
          <button className={styles.button}>
            <a className={styles.link} href={downloadLink}>
              Завантажити
            </a>
          </button>

          <div>{parse(parseLink)}</div>
        </div>
      </div>
    </div>
  );
};

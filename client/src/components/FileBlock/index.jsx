import React from "react";
import styles from "./File.module.css";
import parse from "html-react-parser";

export const FileBlock = ({ fileUrl, isLoading = true }) => {
  return (
    <>
      {(isLoading ? [...Array(fileUrl.length)] : fileUrl).map((name, i) =>
        parse(fileUrl[i])
      )}
    </>
  );
};
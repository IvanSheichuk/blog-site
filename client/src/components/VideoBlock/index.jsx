import React from "react";
import styles from "./Video.module.css";
import parse from "html-react-parser";

export const VideoBlock = ({ videoUrl, isLoading = true }) => {
  return (
    <>
      {(isLoading ? [...Array(videoUrl.length)] : videoUrl).map((name, i) =>
        parse(videoUrl[i])
      )}
    </>
  );
};
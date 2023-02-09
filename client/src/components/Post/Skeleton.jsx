import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import styles from "./Post.module.css";

export const PostSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={500} height={300} />
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonInfo}>
            <Skeleton variant="text" width="80%" height={45} />
            <div className={styles.skeletonTags}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};

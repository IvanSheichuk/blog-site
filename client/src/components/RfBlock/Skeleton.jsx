import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import styles from "./RfBlock.module.css";

export const RFSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
          <div className={styles.skeletonInfo}>
              <Skeleton variant="text" width="80%" height={45} />
          </div>
        <Skeleton variant="rectangular" width={400} height={400} />
      </Stack>
    </div>
  );
};

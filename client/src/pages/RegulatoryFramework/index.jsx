import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RegulatoryFramework.module.css";
import { RfBlock } from "../../components";
import { fetchRegulatoryFramework } from "../../redux/slices/regulatoryFramework";
import { selectIsAuth } from "../../redux/slices/auth";

export const RegulatoryFramework = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { rf } = useSelector((state) => state.rf);

  const isNpLoading = rf.status === "loading";

  useEffect(() => {
    dispatch(fetchRegulatoryFramework());
  }, []);

  return (
    <>
      <div className={styles.root}>
        {(isNpLoading ? [...Array(3)] : rf.items).map((obj, index) =>
          isNpLoading ? (
            <RfBlock key={index} isLoading={true} />
          ) : (
            <RfBlock
              _id={obj._id}
              title={obj.title}
              key={index}
              downloadLink={obj.downloadLink}
              parseLink={obj.parseLink}
              isEditable={isAuth}
            />
          )
        )}
      </div>
    </>
  );
};
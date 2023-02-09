import React, { useEffect } from "react";
import styles from "./PostTag.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Post, TagsBlock } from "../../components";
import { fetchTags } from "../../redux/slices/tags";
import { fetchPostsByTag } from "../../redux/slices/postsByTag";
import { selectIsAuth } from "../../redux/slices/auth";
import { useParams } from "react-router-dom";

export const PostTag = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { tag } = useParams();
  const { postsByTag } = useSelector((state) => state.postsByTag);
  const { tags } = useSelector((state) => state.tags);

  const isTagsLoading = tags.status === "loading";

  const isPostsByTagLoading = postsByTag.status === "loading";

  useEffect(() => {
    dispatch(fetchPostsByTag(tag));
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <TagsBlock items={tags.items} isLoading={isTagsLoading} />

      <div className={styles.root}>
        {(isPostsByTagLoading ? [...Array(5)] : postsByTag.items).map(
          (obj, index) =>
            isPostsByTagLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                previewUrl={obj.previewUrl ?  obj.previewUrl : ""}
                key={index}
                viewsCount={obj.viewsCount}
                tags={obj.tags}
                isEditable={isAuth}
              />
            )
        )}
      </div>
    </>
  );
};
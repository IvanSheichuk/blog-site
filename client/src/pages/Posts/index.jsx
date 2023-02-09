import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post, TagsBlock } from "../../components";
import { fetchPosts } from "../../redux/slices/posts";
import { fetchTags } from "../../redux/slices/tags";
import { selectIsAuth } from "../../redux/slices/auth";
import styles from "./Posts.module.css";

export const Posts = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { posts } = useSelector((state) => state.posts)
  const { tags } = useSelector((state) => state.tags)

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <div>
      <TagsBlock items={tags.items} isLoading={isTagsLoading} />
      <div className={styles.root}>
        {(isPostsLoading ? [...Array(3)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              _id={obj._id}
              key={index}
              title={obj.title}
              previewUrl={obj.previewUrl ? obj.previewUrl : ""}
              viewsCount={obj.viewsCount}
              tags={obj.tags}
              isEditable={isAuth}
            />
          )
        )}
      </div>
    </div>
  );
};

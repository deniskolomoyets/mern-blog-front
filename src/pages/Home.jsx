import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPosts,
  fetchTags,
  fetchSortByNewest,
  fetchSortByPopularity,
  fetchRemovePost,
} from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch(); //to send an asynchronous action(fetchPosts - in posts.js)
  const { posts, tags } = useSelector((state) => state.posts); //from state that in redux=> store.js I take posts
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const [filterState, setFilterState] = React.useState("new");

  const [isDeliting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchPosts()).then(() => {
      dispatch(fetchSortByNewest());
    });
    dispatch(fetchTags());
    setIsDeleting(false);
  }, [isDeliting]); //back-end request to get articles

  const onSortByNewest = () => {
    dispatch(fetchSortByNewest());
  };

  const onSortByPopularity = () => {
    dispatch(fetchSortByPopularity());
  };

  const onClickRemove = (_id) => {
    if (window.confirm("Delete post?")) {
      dispatch(fetchRemovePost(_id));
    }
  };

  //can do faster sorting by usingEffect

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={filterState === "new" ? 0 : 1}
        aria-label="basic tabs example"
      >
        <Tab
          onClick={() => {
            onSortByNewest();
            setFilterState("new");
          }}
          label="New"
        />
        <Tab
          onClick={() => {
            onSortByPopularity();
            setFilterState("popular");
          }}
          label="Popular"
        />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                onClickRemove={onClickRemove}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Michel Dodo",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "This is comment",
              },
              {
                user: {
                  fullName: "Donald Wasser",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

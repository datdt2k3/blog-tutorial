import { Box, Button } from "@mui/material";
import LinkBehavior from "../../components/LinkBehavior";
import { useEffect } from "react";
import {
  getDetailPost,
  selectPostDetail,
  selectPostStatus,
} from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export const Detail = () => {
  const dispatch = useDispatch();
  const post = useSelector(selectPostDetail);
  const postStatus = useSelector(selectPostStatus);
  const { id } = useParams();
  console.log("Detail Post:", post);

  useEffect(() => {
    dispatch(getDetailPost(id));
  }, [dispatch, id]);

  if (postStatus === "failed") {
    return <p>Failed to load post details.</p>;
  }
  return (
    <>
      {postStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Detail</h1>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <p>Post by: {post?.user?.username}</p>
          </Box>
          <Box sx={{ paddingTop: 2 }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Button
              sx={{ marginTop: 2 }}
              variant="outlined"
              component={LinkBehavior}
              to="/"
            >
              Return
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

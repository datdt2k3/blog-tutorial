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
  return (
    <>
      {postStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Detail</h1>
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

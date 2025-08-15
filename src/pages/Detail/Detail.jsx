import { Box, Button } from "@mui/material";
import LinkBehavior from "../../components/LinkBehavior";
import { useEffect } from "react";
import {
  getDetailPost,
  selectPostDetail,
  selectPostStatus,
} from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { Error } from "../../components/Error";
export const Detail = () => {
  const dispatch = useDispatch();
  const post = useSelector(selectPostDetail);
  const postStatus = useSelector(selectPostStatus);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailPost(id));
  }, [dispatch, id]);

  if (postStatus === "error") {
    return <Error />;
  }
  return (
    <>
      {postStatus === "loading" ? (
        <Loading />
      ) : (
        <>
          <h1>Detail</h1>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <p>
              Post by:{" "}
              <Link to={`/author/${post?.user?.id}`}>
                {post?.user?.username}
              </Link>
            </p>
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

import { Grid, Pagination, Stack } from "@mui/material";
import { useEffect } from "react";
import {
  getPost,
  selectPostCount,
  selectPostList,
  selectPostStatus,
} from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/CardItem";
import SearchForm from "../../components/SearchForm";
import Loading from "../../components/Loading";
import { Error } from "../../components/Error";
import { getEnv } from "../../utils/env";
export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ query: "", skip: 0 }));
  }, [dispatch]);

  const postList = useSelector(selectPostList);
  const postStatus = useSelector(selectPostStatus);
  const postCount = useSelector(selectPostCount);
  const pagesCount = Math.ceil(postCount / getEnv("VITE_LIMIT_POST")); // tính số trang dựa trên tổng số bài viết và giới hạn mỗi trang
  if (postStatus === "error") {
    return <Error />;
  }

  const handlePageChange = (_, value) => {
    // chuyển đổi trang
    const skip = (value - 1) * getEnv("VITE_LIMIT_POST");
    dispatch(getPost({ query: "", skip }));
    window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu trang khi chuyển trang
  };
  return (
    <>
      <SearchForm />
      <h1>Home Page</h1>
      {postStatus === "loading" && <Loading type="spinner" />}
      <Grid container spacing={2}>
        {postList.map(({ id, title }) => (
          <Grid size={4} key={id}>
            <CardItem id={id} title={title} />
          </Grid>
        ))}
      </Grid>
      <Stack
        spacing={2}
        sx={{ marginTop: 2, display: "flex", alignItems: "center" }}
      >
        <Pagination count={pagesCount} onChange={handlePageChange} />
      </Stack>
    </>
  );
};

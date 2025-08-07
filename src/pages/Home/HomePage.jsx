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
import { useSearchParams } from "react-router-dom";
export const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const page = Number(searchParam.get("page") ?? 1); // lấy trang từ tham số tìm kiếm, mặc định là 1
  const keyword = searchParam.get("keyword") ?? ""; // lấy từ khóa tìm kiếm từ tham số tìm kiếm, mặc định là rỗng
  useEffect(() => {
    const skip = (page - 1) * getEnv("VITE_LIMIT_POST"); // tính toán số lượng bài viết bỏ qua dựa trên trang hiện tại
    dispatch(getPost({ query: keyword, skip }));
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
    setSearchParam({ page: value }); // cập nhật tham số tìm kiếm trong URL
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
        <Pagination
          count={pagesCount}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

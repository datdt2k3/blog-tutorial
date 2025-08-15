import { Grid, Pagination, Stack } from "@mui/material";
import { useEffect } from "react";
import {
  getPost,
  getPostByUser,
  selectPostCount,
  selectPostList,
  selectPostStatus,
} from "../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";
import { Error } from "../components/Error";
import { getEnv } from "../utils/env";
import { useSearchParams } from "react-router-dom";
export const PostList = ({ filter, value }) => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const keyword = searchParam.get("keyword") ?? ""; // lấy từ khóa tìm kiếm từ tham số tìm kiếm, mặc định là rỗng
  const page = Number(searchParam.get("page") ?? 1); // lấy trang từ tham số tìm kiếm, mặc định là 1
  useEffect(() => {
    const skip = (page - 1) * getEnv("VITE_LIMIT_POST"); // tính toán số lượng bài viết bỏ qua dựa trên trang hiện tại
    if (filter === "user") {
      dispatch(getPostByUser(value, skip));
    } else {
      dispatch(getPost({ query: keyword, skip }));
    }
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
    const params = Array.from(searchParam.entries()).reduce(
      (pre, [key, value]) => {
        if (!pre[key]) {
          pre[key] = value; // nếu tham số chưa tồn tại, thêm vào
        } else {
          if (!Array.isArray(pre[key])) {
            pre[key] = [pre[key]]; // nếu tham số đã tồn tại nhưng không phải mảng, chuyển đổi thành mảng
          }
          pre[key].push(value); // thêm giá trị mới vào mảng
        }
        return pre; // trả về đối tượng tham số đã cập nhật
      },
      {}
    ); // chuyển đổi tham số tìm kiếm thành mảng để dễ dàng kiểm tra

    if (filter === "user") {
      dispatch(getPostByUser(value, skip));
    } else {
      dispatch(getPost({ query: keyword, skip }));
    }
    setSearchParam({ ...params, page: value }); // cập nhật tham số tìm kiếm trong URL
    window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu trang khi chuyển trang
  };
  return (
    <>
      {/* <SearchForm /> */}
      <h1>Bài viết</h1>
      {postStatus === "loading" && <Loading type="spinner" />}
      {postStatus.length ? (
        <>
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
      ) : (
        <h3>Không có bài viết nào</h3>
      )}
    </>
  );
};

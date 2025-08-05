import { Grid } from "@mui/material";
import { useEffect } from "react";
import {
  getPost,
  selectPostList,
  selectPostStatus,
} from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/CardItem";
export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const postList = useSelector(selectPostList);
  const postStatus = useSelector(selectPostStatus);

  return (
    <>
      <h1>Home Page</h1>
      <Grid container spacing={2}>
        {postStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          postList.map(({ id, title }) => (
            <Grid size={4} key={id}>
              <CardItem id={id} title={title} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

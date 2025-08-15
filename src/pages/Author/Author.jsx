import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthor,
  selectAuthorById,
  selectAuthorStatus,
} from "../../redux/slice/userSlice";
import { useParams } from "react-router-dom";
import { Error } from "../../components/Error";
import { PostList } from "../../components/PostList";
const Author = () => {
  const { id } = useParams(); // Assuming you have a way to get the author ID from the URL or props
  const dispatch = useDispatch();
  const user = useSelector(selectAuthorById); // Select the user from the Redux store
  const userStatus = useSelector(selectAuthorStatus); // Get the status of the user fetch
  useEffect(() => {
    dispatch(getAuthor(id));
  }, [id, dispatch]);

  if (userStatus === "error") {
    return <Error />;
  }

  return (
    <>
      <h1>Tác giả {user?.username}</h1>
      <PostList filter="user" value={id} />
    </>
  );
};

export default Author;

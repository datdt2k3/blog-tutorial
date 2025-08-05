import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getPost } from "../redux/slice/postSlice";
import { debounce } from "../utils/debounce";
const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setKeyword(e.target.value);
    requestSearch(e.target.value);
  };

  const requestSearch = useCallback(
    debounce((keyword) => {
      dispatch(getPost(keyword));
    }),
    []
  );
  //   useEffect(() => {
  //     requestSearch(keyword);
  //   }, [keyword]);

  return (
    <>
      <Box className="App">
        <form style={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            label="Search title"
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              width: 350,
              margin: "10px auto",
            }}
            value={keyword}
            onChange={handleChange}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </form>
      </Box>
    </>
  );
};

export default SearchForm;

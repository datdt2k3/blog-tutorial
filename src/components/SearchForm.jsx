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
import { useSearchParams } from "react-router-dom";
const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSearchParam({ keyword: value }); // Reset to first page on new search
  };

  const requestSearch = useCallback(
    debounce((keyword) => {
      dispatch(getPost({ query: keyword, skip: 0 }));
    }),
    []
  );
  useEffect(() => {
    requestSearch(keyword);

    if (searchParam.get("keyword")) {
      setKeyword(searchParam.get("keyword"));
    }
  }, [keyword]);

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
            value={searchParam.get("keyword") ?? keyword}
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

import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlkeyword } = useParams();
  const [keyword, setKeyword] = useState(urlkeyword || "");

  const handleSearch = (searchKeyword) => {
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`);
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
    handleSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleSearch(keyword);
    setKeyword("");
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={handleChange}
        value={keyword}
        placeholder="Search Products . . ."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" className="p-2 mx-2" variant="outline-light">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

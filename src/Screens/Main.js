import React, { useEffect, useMemo, useState } from "react";
import Box from "../Components/Box";
import { Link } from "react-router-dom";

export default function Main() {
  const [book, setBook] = useState([]);
  const [search, setSearch] = useState("India");
  const [text, setText] = useState("");

  useMemo(() => {
    try {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&download=epub&key=AIzaSyD_d_29Zq6n63LUjWQMIJvVFY2QI7Rwb4E`
      )
        .then((res) => res.json())
        .then((data) => setBook(data));
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  function handelSearch(e) {
    e.preventDefault();
    {
      text === "" ? setSearch(search) : setSearch(text);
    }
    setText("");
  }
  return (
    <div className="container">
      <div className="head">
        <h1>BookStore🔖</h1>
      </div>
      <div className="searchBar">
        <form className="form" label="text" onSubmit={handelSearch}>
          <input
            className="inputsearch"
            type="text"
            value={text}
            placeholder="Search "
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mainbtns">
            {" "}
            <button className="searchbtn" type="submit">
              Search
            </button>
            <Link to="/favorite">
              <button className="favbtn btn-back">💗Favorite</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="main">
        {Object.keys(book).length === 0 ? (
          <></>
        ) : (
          book.items.map((ele) => (
            <Box
              title={ele.volumeInfo.title}
              subTitle={ele.volumeInfo.subtitle}
              author={ele.volumeInfo.authors[0]}
              date={ele.volumeInfo.publishedDate}
              rating={ele.volumeInfo.averageRating}
              link={ele.volumeInfo.previewLink}
              key={ele.id}
              ele={ele}
            />
          ))
        )}
      </div>
    </div>
  );
}

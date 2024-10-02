import React, { useMemo, useState } from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";
import styles from "./BookStore.module.css";
import { Search, Heart } from "lucide-react";
import Loading from "../Components/LoadingSpinner";

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

  function handleSearch(e) {
    e.preventDefault();
    text === "" ? setSearch(search) : setSearch(text);
    setText("");
  }
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.logo}>
            BookStore
            <span className={styles.tagIcon}>🔖</span>
          </h1>
        </header>
        <main className={styles.main}>
          <form className={styles.searchContainer} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for books..."
              className={styles.searchInput}
              onChange={(e) => setText(e.target.value)}
            />
            <button className={styles.searchButton}>
              <Search size={18}/>
              Search
            </button>
          </form>
          <Link
            to="/favorite"
            style={{ textDecoration: "none" }}
            className={styles.favoriteButton}
          >
            <Heart size={18} />
            Favorites
          </Link>
        </main>
        <div className="main">
        {Object.keys(book).length === 0 ? (
          <Loading/>
        ) : (
          book.items.map((ele) => (
            <Book
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
    </>
  );
}

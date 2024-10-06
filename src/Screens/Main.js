import React, { useMemo, useState } from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";
import styles from "./BookStore.module.css";
import { Search, Heart, XCircle } from "lucide-react";
import Loading from "../Components/LoadingSpinner";
import bookStore from "../bookStore";
import { useDebounce } from "use-debounce";

export default function Main() {
  const [book, setBook] = useState([]);
  ///const [search, setSearch] = useState("India");
  const [serachText, setSearchText] = useState("");
  const [debouncedText] = useDebounce(serachText, 200); // Debouncing with a 200ms delay, [adjustable based on requiremens]
  useMemo(() => {
    const query = debouncedText.trim() === "" ? "India" : debouncedText; // If the search query is empty, don't fetch
    try {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&download=epub&key=AIzaSyD_d_29Zq6n63LUjWQMIJvVFY2QI7Rwb4E`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBook(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [debouncedText]);

  // Function to clear the input when the cross icon is clicked
  const clearSearch = () => {
    setSearchText(""); // Clears the search text
  };

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
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              {/* Search Icon */}
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                value={serachText}
                placeholder="Search for books..."
                className={styles.searchInput}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {/* Conditionally render the Clear (Cross) icon if there is text */}
              {serachText && (
                <XCircle
                  size={18}
                  className={styles.clearIcon}
                  onClick={clearSearch}
                />
              )}
            </div>
          </div>
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
            <Loading />
          ) : (
            book.items &&
            book.items.map((ele) => (
              <Book
                title={ele.volumeInfo?.title}
                subTitle={ele.volumeInfo?.subtitle}
                author={ele.volumeInfo?.authors && ele.volumeInfo.authors[0]}
                date={ele.volumeInfo?.publishedDate}
                rating={ele.volumeInfo?.averageRating}
                link={ele.volumeInfo?.previewLink}
                key={ele.id}
                ele={ele}
                thumb={ele.volumeInfo.imageLinks.thumbnail}
              />
            ))
          )}
        </div>
        <div className="fav">
          <h1 className="txt-d"> Contributed Books </h1>
          <div className="main ">
            {bookStore.map((ele) => (
              <Book
                title={ele.title}
                subTitle={ele.subtitle}
                author={ele.authors && ele.authors[0]}
                date={ele.publishedDate}
                rating={ele.averageRating}
                link={ele.previewLink}
                key={ele.id}
                ele={ele}
                thumb={ele.thumnail}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

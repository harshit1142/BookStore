import React, { useMemo, useState, useEffect } from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";
import styles from "./BookStore.module.css";
import { Search, Heart, Sun, Moon, XCircle } from "lucide-react";
import Loading from "../Components/LoadingSpinner";
import bookStore from "../bookStore";
import BookSkeleton from "../Components/skeletons/BookSkeleton";
import { useDebounce } from "use-debounce";

export default function Main() {
  const [book, setBook] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedText] = useDebounce(searchText, 200); // Debouncing with a 200ms delay
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use localStorage to persist dark mode setting across sessions
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(savedDarkMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Fetch books from API based on search text
  useMemo(() => {
    const query = debouncedText.trim() === "" ? "India" : debouncedText;  // Default search term
    setIsLoading(true); // Set loading state before fetching
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&download=epub&key=AIzaSyD_d_29Zq6n63LUjWQMIJvVFY2QI7Rwb4E`
    )
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [debouncedText]);

  // Function to clear the input when the cross icon is clicked
  const clearSearch = () => {
    setSearchText(""); // Clears the search text
  };

  // Toggle dark mode on and off
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.logo}>
              BookStore
              <span className={styles.tagIcon}>🔖</span>
            </h1>
          </div>
          <div>
            <button className={styles.darkModeButton} onClick={toggleDarkMode}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              {/* Search Icon */}
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                value={searchText}
                placeholder="Search for books..."
                className={styles.searchInput}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {/* Conditionally render the Clear (Cross) icon if there is text */}
              {searchText && (
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
          {isLoading ? (
            <>
              <BookSkeleton />
              <BookSkeleton />
              <BookSkeleton />
              <BookSkeleton />
              <BookSkeleton />
              <BookSkeleton />
              <BookSkeleton />
              <BookSkeleton />
            </>
          ) : (
            book.items?.map((ele) => (
              <Book
                title={ele.volumeInfo?.title}
                subTitle={ele.volumeInfo?.subtitle}
                author={ele.volumeInfo?.authors && ele.volumeInfo.authors[0]}
                date={ele.volumeInfo?.publishedDate}
                rating={ele.volumeInfo?.averageRating}
                link={ele.volumeInfo?.previewLink}
                key={ele.id}
                ele={ele}
                thumb={ele.volumeInfo.imageLinks?.thumbnail}
              />
            ))
          )}
        </div>

        <div className="fav">
          <h1 className="txt-d">Contributed Books</h1>
          <div className="main">
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

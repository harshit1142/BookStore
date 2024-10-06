import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import List from "./List";
import { useNavigate } from "react-router-dom";
import styles from "./favbook.module.css";
import { ArrowLeft, Sun, Moon } from "lucide-react";

function DisplayFav({ Fav }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Use localStorage to persist dark mode setting across sessions
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkModeFav");
    setDarkMode(savedDarkMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkModeFav", darkMode);
  }, [darkMode]);

  // Toggle dark mode on and off
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
        <header className={styles.header}>
          <button className={` ${styles.backButton} `} onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            {/* <span className="sr-only">Back</span> */}
          </button>
          <h1 className={styles.title}>
            Favorite Books
            <span role="img" aria-label="heart" className={styles.heartIcon}>
              ❤️
            </span>
          </h1>
          <button className={styles.darkModeButton} onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {/* {darkMode ? "Light Mode" : "Dark Mode"} */}
          </button>
        </header>
        <main className={styles.main}>
          <ul className={styles.bookList}>
            {Fav.length !== 0 ? (
              Fav.map((ele) =>
                ele?.volumeInfo ? (
                  <List
                    title={ele.volumeInfo.title}
                    author={ele.volumeInfo.authors[0]}
                    link={ele.volumeInfo.previewLink}
                    ele={ele}
                    key={ele.id}
                  />
                ) : (
                  <List
                    title={ele.title}
                    author={ele.authors[0]}
                    link={ele.previewLink}
                    ele={ele}
                    key={ele.id}
                  />
                )
              )
            ) : (
              <p style={{ fontSize: "1.5rem", color: "#ffffff" }}>
                List is empty
              </p>
            )}
          </ul>
        </main>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { Fav: state.Fav };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFav);

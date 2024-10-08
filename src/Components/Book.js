import React, { useState } from "react";
import { addFav } from "../redux/actions/Fav";
import { connect } from "react-redux";
import styles from "./book.module.css";
import toast, { Toaster } from "react-hot-toast";

function Book({
  title,
  subTitle,
  author,
  date,
  rating,
  link,
  Fav,
  ele,
  thumb,
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavClick = () => {
    Fav(ele);
    notify();
    setIsFavorited(!isFavorited); // Toggle the favorite state
  };

  const notify = () => toast.success(`${title} added to favorites`);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={styles.card}>
        <div className={styles.topSection}>
          <img src={`${thumb}`} alt="" />
          <div className={styles.icons}>
            <div className={styles.logo}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className={styles.svg}>
                <path fill="white" d="M38.0481 4.82927..."></path>
                <path fill="white" d="M86.9 61.8682..."></path>
                <path fill="white" d="M2.86102e-06 83.2195..."></path>
              </svg>
            </div>
            <div className={styles.socialMedia}></div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <span className={styles.title}>{title}</span>
          <div className={styles.item}>
            {/* <span className={styles.bigText}>Author</span> */}
            <span className={styles.regularText}>{author}</span>
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <span className={styles.bigText}>Year</span>
              <span className={styles.regularText}>{date}</span>
            </div>
            {rating && (
              <div className={styles.item}>
                <span className={styles.bigText}>Rating</span>
                <span className={styles.regularText}>{rating}</span>
              </div>
            )}
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <span className={styles.bigText}>Favourite</span>
              <span
                className={styles.socialMedia}
                onClick={handleFavClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isFavorited ? "#a3bbff" : "#ffffff"} // Fill color changes based on the state
                >
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3m-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05" />
                </svg>
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.bigText}>Read</span>
              <span className={styles.socialMedia}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"
                    />
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  Fav: (ele) => dispatch(addFav(ele)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
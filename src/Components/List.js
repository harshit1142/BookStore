import React from "react";
import { removeFav } from "../redux/actions/Fav";
import { connect } from "react-redux";
import styles from "./favbook.module.css";
import { Book, Trash2 } from "lucide-react";
function List({ title, author, link, Fav, ele }) {
  return (
    <div className={styles.bookItem}>
      <div className={styles.bookInfo}>
        <h2 className={styles.bookTitle}>{title}</h2>
        <p className={styles.bookAuthor}>by {author}</p>
      </div>
      <div className={styles.bookActions}>
        <a
          href={link}
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.readButton}>
            <Book size={18} />
            Read
          </button>
        </a>
        <button className={styles.removeButton} onClick={() => Fav(ele)}>
          <Trash2 size={18} />
          Remove
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  Fav: (ele) => dispatch(removeFav(ele)),
});
export default connect(mapStateToProps, mapDispatchToProps)(List);

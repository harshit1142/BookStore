import React from "react";
import { connect } from "react-redux";
import List from "./List";
import { useNavigate } from "react-router-dom";
import styles from "./favbook.module.css";
import { ArrowLeft} from "lucide-react";

function DisplayFav({ Fav }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            <span className="sr-only">Back</span>
          </button>
          <h1 className={styles.title}>
            Favorite Books
            <span role="img" aria-label="heart" className={styles.heartIcon}>
              ❤️
            </span>
          </h1>
        </header>
        <main className={styles.main}>
          <ul className={styles.bookList}>
            {Fav.length !== 0 ? (
              Fav.map((ele) => (
                 ele?.volumeInfo ?
                (<List
                  title={ele.volumeInfo.title}
                  author={ele.volumeInfo.authors[0]}
                  link={ele.volumeInfo.previewLink}
                  ele={ele}
                  key={ele.id}
                />) :
                 ( <List
                    title={ele.title}
                    author={ele.authors[0]}
                    link={ele.previewLink}
                    ele={ele}
                    key={ele.id}
                  />)
              ))
            ) : (
                <p style={{fontSize: "1.5rem",color:"#ffffff"}}>List is empty</p>
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

import React from "react";
import { addFav } from "../redux/actions/Fav";
import { connect } from "react-redux";
function Box({ title, subTitle, author, date, rating, link, Fav, ele }) {
  const handleReadClick = () => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <div className="box">
      <div className="top">
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
      <div className="middle">
        <h3 className="author">by-{author}</h3>
        <p className="date">{date}</p>
      </div>
      <div className="bottom">
        {rating > 0 && <p>Rating : {rating}/5</p>}
        <div className="boxbuttons">
          <button className="btn" onClick={() => Fav(ele)}>
            💗Fav
          </button>
          <button className="btn" onClick={handleReadClick}>
            Read
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  Fav: (ele) => dispatch(addFav(ele)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Box);

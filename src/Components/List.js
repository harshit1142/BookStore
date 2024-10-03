import React from "react";
import { removeFav } from "../redux/actions/Fav";
import { connect } from "react-redux";
function List({ title, author, link, Fav, ele }) {
  const handleReadClick = () => {
    window.open(link, "_blank", "noopener noreferrer");
  };
  return (
    <div className="list">
      <h1>{title}</h1>
      <p>by-{author}</p>
      {/* <a href={link} target="_blank" rel="noopener noreferrer" > <button className='btn'>Read📖</button></a> */}
      <div className="boxbuttons">
        <button className="btn" onClick={handleReadClick}>
          Read📖
        </button>
        <button className="btn btn-back" onClick={() => Fav(ele)}>
          Remove🗑️
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

import React from "react";
import { connect } from "react-redux";
import List from "./List";
import { Link } from "react-router-dom";

function DisplayFav({ Fav }) {
  return (
    <div className="display">
      <Link to="/">
        <button className="btn btn-back">◀ Back</button>
      </Link>
      <h1 className="fav-heading">Favorite Books💗</h1>
      <ol>
        {Fav.length !== 0 ? (
          Fav.map((ele) => (
            <li>
              <List
                title={ele.volumeInfo.title}
                author={ele.volumeInfo.authors[0]}
                link={ele.volumeInfo.previewLink}
                ele={ele}
                key={ele.id}
              />
            </li>
          ))
        ) : (
          <p>List is empty</p>
        )}
      </ol>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { Fav: state.Fav };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFav);

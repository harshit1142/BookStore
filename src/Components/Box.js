import React from 'react'
import { addFav } from '../redux/actions/Fav'
import { connect } from 'react-redux'
function Box({title,subTitle,author,date,rating,link,Fav,ele}) {

  


  return (
    <div className='box'>
        <div className='top'>
             <h1>{title}</h1>
             <p>{subTitle}</p>
        </div>
        <div className='middle'>
              <h3>by-{author}</h3>
              <p>{date}</p>
        </div>
        <div className='bottom'>
           {rating>0 && <p>Rating : {rating}/5</p>}
           <button className='btn' onClick={()=>Fav(ele)}>💗Fav</button>
           <a href={link} target="_blank" rel="noopener noreferrer" > <button className='btn'>Read</button></a>
        </div>
    </div>
  )
}

const mapStateToProps=(state)=>({})

const mapDispatchToProps=(dispatch)=>({
  Fav:(ele)=>(dispatch(addFav(ele)))
})
export default connect(mapStateToProps,mapDispatchToProps) (Box);

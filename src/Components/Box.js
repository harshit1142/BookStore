import React from 'react'

export default function Box({title,subTitle,author,date,rating}) {

  


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
           <button>💗</button>
        </div>
    </div>
  )
}

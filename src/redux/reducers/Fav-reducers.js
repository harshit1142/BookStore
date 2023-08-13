import { ADD_FAV,REMOVE_FAV } from "../actions/action-types";


const initialState=[];

export default (state=initialState,action)=>{
    switch(action.type)
    {
        case ADD_FAV:
          return  state.includes(action.payload)? state : [...state,action.payload]
            
        case REMOVE_FAV:
            return state.filter((ele)=>ele!==action.payload)
        default:
             return state
    }
}
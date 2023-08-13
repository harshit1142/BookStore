import { createStore ,combineReducers} from "redux";


import FavReducers from "./reducers/Fav-reducers";
const rootReducer=combineReducers({
    Fav:FavReducers
})

 const store=createStore(rootReducer)

 export default store;
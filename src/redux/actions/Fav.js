import { ADD_FAV, REMOVE_FAV } from "./action-types"

export const addFav=(ele=>({
    type:ADD_FAV,
    payload:ele
}))

export const removeFav=(ele=>({
    type:REMOVE_FAV,
    payload:ele
}))
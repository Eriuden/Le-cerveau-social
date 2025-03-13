import { GET_COUNCIL_ERRORS } from "../actions/council.action";
import { GET_USER_ERRORS } from "../actions/user.action";

const initialState = {userError : [], councilError : []}

export const errorReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_COUNCIL_ERRORS:
            return {
                councilError: action.payload
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload 
            }    
        default:
            return state
    }
}
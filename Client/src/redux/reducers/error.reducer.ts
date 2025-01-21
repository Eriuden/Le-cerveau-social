import { GET_POST_ERRORS } from "../actions/post.action";
import { GET_USER_ERRORS } from "../actions/user.action";

const initialState = {userError : [], articleError : []}

export const errorReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_POST_ERRORS:
            return {
                articleError: action.payload
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload 
            }    
        default:
            return state
    }
}
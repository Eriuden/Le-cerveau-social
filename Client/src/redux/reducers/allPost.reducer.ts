import { GET_ALLPOSTS } from "../actions/post.action";

const initialState:any = {}

export const allPostsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALLPOSTS :
            return action.payload
    
        default:
            return state;
    }
}
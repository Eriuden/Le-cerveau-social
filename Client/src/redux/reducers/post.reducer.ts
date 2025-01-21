import { GET_POST, UPDATE_POST, DELETE_POST, FIND_POST_INTERESTING, FIND_POST_CONSTRUCTIVE,
FIND_POST_FUNNY, FIND_POST_UNPERTINENT, FIND_INTERESTING_ANYMORE, FIND_CONSTRUCTIVE_ANYMORE,
FIND_FUNNY_ANYMORE, FIND_UNPERTINENT_ANYMORE, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from "../actions/post.action";

const initialState = {}
export const postReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_POST:
            return action.payload

        case UPDATE_POST:
             return state.map((post:any) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                } else return post
             })
        case DELETE_POST:
            return state.filter((post:any)=> post.id !== action.payload.postId)
        
            case FIND_POST_INTERESTING:
                return state.map((post:any) => {
                    if (post._id === action.payload.postId)
                        return {
                            ...post,
                            interesting: [ action.payload.userId, ...post.interesting]
                        }
                })
            case FIND_POST_CONSTRUCTIVE:
                return state.map((post:any) => {
                    if (post._id === action.payload.postId)
                        return {
                            ...post,
                            constructive: [ action.payload.userId, ...post.constructive]
                        }
                })
            case FIND_POST_FUNNY:
                return state.map((post:any) => {
                    if (post._id === action.payload.postId)
                        return {
                            ...post,
                            funny: [ action.payload.userId, ...post.funny]
                        }
                })
            case FIND_POST_UNPERTINENT:
                return state.map((post:any) => {
                    if (post._id === action.payload.postId)
                        return {
                            ...post,
                            unpertinent: [ action.payload.userId, ...post.unpertinent]
                        }
                })
                
        default:
            return state
    }
} 
import { GET_TRENDS } from "../actions/post.action"

const initialState:any = {}
export default function trendingReducer(state = initialState, action:any) {
    
  switch (action.type) {
      case GET_TRENDS:
        return action.payload
      default:
        return state
  }
  
}
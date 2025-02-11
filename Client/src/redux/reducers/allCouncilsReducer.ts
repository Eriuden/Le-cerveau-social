import { GET_ALL_COUNCILS } from "../actions/council.action"

const initialState = {}

export const allUsersReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_ALL_COUNCILS:
            return action.payload 
        default:
            return state
    }
}
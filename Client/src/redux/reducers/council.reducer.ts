import { GET_COUNCIL } from "../actions/council.action"
import { UPDATE_COUNCIL } from "../actions/council.action"
import { DELETE_COUNCIL } from "../actions/council.action"

const initialState = {}

export const CouncilReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_COUNCIL:
            return action.payload 

        case UPDATE_COUNCIL:
            return state.map((council:any) => {
                if (council.id === action.payload.councilId) {
                    return {
                        ...council,
                        name: action.payload.name,
                        banner: action.payload.banner,
                        theme: action.payload.theme,
                    }
                } else return council
             })

        case DELETE_COUNCIL:
            return state.filter((council:any)=> council.id !== action.payload.councilId)

        default:
            return state
    }
}
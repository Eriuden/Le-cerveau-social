import axios from "axios";

export const GET_COUNCIL = "GET_COUNCIL"
export const GET_ALL_COUNCILS= "GET_ALLCOUNCILS"
export const CREATE_COUNCIL = "CREATE_COUNCIL"
export const UPDATE_COUNCIL = "UPDATE_COUNCIL"
export const DELETE_COUNCIL= "DELETE_COUNCIL"

export const GET_COUNCIL_ERRORS = "GET_COUNCIL_ERRORS"

type councilProps = {
    councilId: string,
    name: string,
    banner: string,
    theme: string,
    presidentId: string,
}



export const getCouncils = (num:number, dispatch:any) => {   
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/council/`)
        .then ((res) => {           
            const array = res.data.slice(0, num)
            dispatch ({type: GET_COUNCIL, payload: array})
            dispatch ({type:GET_ALL_COUNCILS, payload: res.data})
        })
        .catch((err) => {
            console.log(err)
        })  
}

export const createCouncil = (data:any, dispatch:any) => {  
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/council/`, data)
        .then((res) => {
            if (res.data.errors) {
                dispatch( {type: GET_COUNCIL_ERRORS, payload: res.data.errors })
            } else {
                dispatch({ type: GET_COUNCIL_ERRORS, payload: ""})
            }
        })
}

export const updateCouncil = ({councilId, name, banner, theme} : councilProps, dispatch:any) => {   
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/council/${councilId}`,
            data:{name, banner, theme},
        })
        .then(() => {
            dispatch({ type: UPDATE_COUNCIL, payload: {councilId, name, banner, theme} })
        })
        .catch((err) => console.log(err))
}

export const deleteCouncil = ({councilId, name, banner, theme}: councilProps, dispatch:any) => {  
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/council/${councilId}`,
            data:{name, banner, theme},
        })
        .then(() => {
            dispatch({ type: DELETE_COUNCIL, payload: {councilId} })
        })
        .catch((err) => console.log(err))
}
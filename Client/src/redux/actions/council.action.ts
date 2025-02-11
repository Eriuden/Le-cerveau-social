import axios from "axios";

export const GET_COUNCIL = "GET_COUNCIL"
export const GET_ALL_COUNCILS= "GET_ALLCOUNCILS"
export const CREATE_COUNCIL = "CREATE_COUNCIL"
export const UPDATE_POST = "UPDATE_COUNCIL"
export const DELETE_POST= "DELETE_COUNCIL"

export const GET_COUNCIL_ERRORS = "GET_COUNCIL_ERRORS"

type postProps = {
    postId: string,
    picture: string,
    message: string,
    video: string,
    userId: string,
    findInteresting:[string],
    findConstructive:[string],
    findFunny:[string],
    findUnpertinent:[string]
}



export const getPosts = (num:number) => {
    return (dispatch:any) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then ((res) => {
            
            const array = res.data.slice(0, num)
            dispatch ({type: GET_COUNCIL, payload: array})
            dispatch ({type:GET_ALL_COUNCILS, payload: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const addPost = (data:any) => {
    return (dispatch:any) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
            if (res.data.errors) {
                dispatch( {type: GET_COUNCIL_ERRORS, payload: res.data.errors })
            } else {
                dispatch({ type: GET_COUNCIL_ERRORS, payload: ""})
            }
        })
    }
}

export const updatePost = ({postId, message} : postProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:{message},
        })
        .then(() => {
            dispatch({ type: UPDATE_POST, payload: {message, postId} })
        })
        .catch((err) => console.log(err))
    }
}

export const deletePost = ({postId, message}: postProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:{message},
        })
        .then(() => {
            dispatch({ type: DELETE_POST, payload: {postId} })
        })
        .catch((err) => console.log(err))
    }
}
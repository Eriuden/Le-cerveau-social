import axios from "axios";

export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const GET_USER_ERRORS = "GET_USER_ERRORS"
export const UPDATE_PASSWORD = "UPDATE_PASSWORD"
export const DELETE_USER = "DELETE_USER"
export const FOLLOW_USER= "FOLLOW_USER"
export const UNFOLLOW_USER= "UNFOLLOW_USER"

type userProps = {
    userId: string,
    name: string,
    email: string,
    adress: string,
    password: string
}

export const getUser = (uid: string, dispatch:any) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({type: GET_USER, payload: res.data})
            })
            .catch((err) => window.alert(err))
}

export const updateUser = ({userId, name, adress, email} : userProps, dispatch: any) => { 
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/user` + userId,
            data: {name, adress, email}
        })
        .then(()=> {
            dispatch({type: UPDATE_USER, payload: name, adress, email})
        })
}

export const uploadPicture = (data: any, id: string, dispatch:any) => {
        return axios 
            .post(`${process.env.REACT_APP_API_URL}api/user/upload-userPic`, data)
            .then((res)=> {
                if (res.data.errors) {
                    dispatch({type: GET_USER_ERRORS, payload: res.data.errors})
                } else {
                    dispatch ({ type: GET_USER_ERRORS, payload: ""})
                    return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res)=> {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture})
                    })
                }
            })
            .catch((err) => console.log(err))   
}

export const updatePassword = (userId: string, password: string, dispatch:any) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}api/user` + userId,
            data: {password}
        })
        .then(()=> {
            dispatch({type: UPDATE_PASSWORD, payload: password})
        })
        .catch((err)=> window.alert(err))
}

export const deleteUser = ({userId, name, email, adress, password} : userProps, dispatch:any) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: {name, email, adress, password}
        })
        .then(()=> {
            dispatch({type: DELETE_USER, payload: {userId}})
        })
}

export const followUser = (followerId:string, idToFollow:string, dispatch: any) => {   
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: { idToFollow },
        })
            .then (() => {
                dispatch({ type :FOLLOW_USER, payload:{idToFollow}})
            })
            .catch((err) => console.log(err))
}

export const unfollowUser = (followerId:string, idToUnfollow:string, dispatch: any) => {  
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: { idToUnfollow },
        })
            .then (() => {
                dispatch({ type :UNFOLLOW_USER, payload:{idToUnfollow}})
            })
            .catch((err) => console.log(err))
}
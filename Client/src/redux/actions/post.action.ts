import axios from "axios";

export const GET_POST = "GET_POST"
export const GET_ALLPOSTS= "GET_ALLPOSTS"
export const ADD_POST = "ADD_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST= "DELETE_POST"
export const FIND_POST_INTERESTING = "FIND_POST_INTERESTING"
export const FIND_POST_CONSTRUCTIVE = "FIND_POST_CONSTRUCTIVE"
export const FIND_POST_FUNNY = "FIND_POST_FUNNY"
export const FIND_POST_UNPERTINENT = "FIND_POST_UNPERTINENT"
export const FIND_INTERESTING_ANYMORE = "FIND_INTERESTING_ANYMORE"
export const FIND_CONSTRUCTIVE_ANYMORE = "FIND_CONSTRUCTIVE_ANYMORE"
export const FIND_FUNNY_ANYMORE = "FIND_FUNNY_ANYMORE"
export const FIND_UNPERTINENT_ANYMORE = "FIND_UNPERTINENT_ANYMORE"

//section comments
export const ADD_COMMENT= "ADD_COMMENT"
export const EDIT_COMMENT= "EDIT_COMMENT"
export const DELETE_COMMENT= " DELETE_COMMENT"

export const GET_TRENDS = "GET_TRENDS"

export const GET_POST_ERRORS = "GET_POST_ERRORS"

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

type commentProps = {
    postId: string,
    commentId: string,
    commenterId: string,
    commenterName: string,
    text: string
}



export const getPosts = (num:number) => {
    return (dispatch:any) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then ((res) => {
            //avec slice, il coupe ce qui est après 0 et num
            //Ainsi là, il affichera un nombre maximum de posts
            const array = res.data.slice(0, num)
            dispatch ({type: GET_POST, payload: array})
            dispatch ({type:GET_ALLPOSTS, payload: res.data})
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
                dispatch( {type: GET_POST_ERRORS, payload: res.data.errors })
            } else {
                dispatch({ type: GET_POST_ERRORS, payload: ""})
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

export const findPostInteresting = ({postId,userId}: postProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}/api/post/find-post-interesting/` + postId,
            data: { id: userId }
        })
        .then(() => {
            dispatch({type: FIND_POST_INTERESTING, payload:{postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const findPostConstructive = ({postId,userId}: postProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}/api/post/find-post-constructive/` + postId,
            data: { id: userId }
        })
        .then(() => {
            dispatch({type: FIND_POST_CONSTRUCTIVE, payload:{postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const findPostFunny = ({postId,userId}: postProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}/api/post/find-post-funny/` + postId,
            data: { id: userId }
        })
        .then(() => {
            dispatch({type: FIND_POST_FUNNY, payload:{postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const findPostUnpertinent = ({postId,userId}: postProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}/api/post/find-post-unpertinent/` + postId,
            data: { id: userId }
        })
        .then(() => {
            dispatch({type: FIND_POST_UNPERTINENT, payload:{postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const interestingAnymore = ({postId,userId}: postProps) => {
    return(dispatch:any) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/post/not-interesting-anymore/` + postId,
            data: { id: userId}
        })
        .then(() => {
            dispatch({type: FIND_INTERESTING_ANYMORE, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const constructiveAnymore = ({postId,userId}: postProps) => {
    return(dispatch:any) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/post/not-constructive-anymore/` + postId,
            data: { id: userId}
        })
        .then(() => {
            dispatch({type: FIND_CONSTRUCTIVE_ANYMORE, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const funnyAnymore = ({postId,userId}: postProps) => {
    return(dispatch:any) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/post/not-funny-anymore/` + postId,
            data: { id: userId}
        })
        .then(() => {
            dispatch({type: FIND_FUNNY_ANYMORE, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const unpertinentAnymore = ({postId,userId}: postProps) => {
    return(dispatch:any) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/post/not-unpertinent-anymore/` + postId,
            data: { id: userId}
        })
        .then(() => {
            dispatch({type: FIND_UNPERTINENT_ANYMORE, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}


export const addComment = ({postId, commenterId, text, commenterName}: commentProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data:{commenterId, text, commenterName},
        })
        .then(() => {
            dispatch({ type: ADD_COMMENT, payload: {postId} })
        })
        .catch((err) => console.log(err))
    }
}

export const editComment = ({postId, commentId, text}:commentProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data:{commentId, text},
        })
        .then(() => {
            dispatch({ type: EDIT_COMMENT, payload: {postId, commentId, text} })
        })
        .catch((err) => console.log(err))
    }
}

export const deleteComment = ({postId, commentId}:commentProps) => {
    return (dispatch:any) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data:{commentId},
        })
        .then(() => {
            dispatch({ type: DELETE_COMMENT, payload: {postId, commentId} })
        })
        .catch((err) => console.log(err))
    }
}

export const getTrends = (sortedArray:any) => {
    return (dispatch:any) => {
        dispatch({type: GET_TRENDS, payload: sortedArray})
    }
}
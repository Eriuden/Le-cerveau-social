import { useContext, useEffect, useState } from "react"
import { UidContext } from "../../AppContext"
import { findPostFunny, funnyAnymore} from "../../../redux/actions/post.action"
import { useDispatch } from "react-redux"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export const FunnyButton = (postProps:any) => {
    const [funny, setFunny] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const findFunny = () => {
        dispatch(findPostFunny(postProps._id, uid))
        setFunny(true)
    }
    const findFunnyAnymore = () => {
        dispatch(funnyAnymore(postProps._id, uid))
        setFunny(false)
    }

    useEffect(() => {
        if (postProps.funny.includes(uid)) setFunny(true)
        else setFunny(false)
    }, [uid, postProps.funny, funny])

  return (
    <div>
        {
        uid === null && (
            <Popup trigger= {<img src="./img/icons/heart.svg" alt="like" />} position= {
                ['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick >
                    <div>Vous devez être connecté pour réagir à un post</div>
            </Popup> 
        )}
        {
        uid && funny === false && (
            <img src="./img/icons/heart.svg" onClick={findFunny} alt="like"/>
        )}

        {
        uid && funny && (
            <img src="./img/icons/heart-filled.svg" onClick={findFunnyAnymore} alt="unLike" />
        )}
        <span>{postProps.funny.length}</span>
    </div>
  )
}
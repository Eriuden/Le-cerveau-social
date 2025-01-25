import { useContext, useEffect, useState } from "react"
import { UidContext } from "../../AppContext"
import { findPostUnpertinent, unpertinentAnymore} from "../../../redux/actions/post.action"
import { useDispatch } from "react-redux"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export const UnpertButton = (postProps:any) => {
    const [unpertinent, setUnpertinent] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const findUnpertinent = () => {
        dispatch(findPostUnpertinent(postProps._id, uid))
        setUnpertinent(true)
    }
    const findUnpertinentAnymore = () => {
        dispatch(unpertinentAnymore(postProps._id, uid))
        setUnpertinent(false)
    }

    useEffect(() => {
        if (postProps.unpertinent.includes(uid)) setUnpertinent(true)
        else setUnpertinent(false)
    }, [uid, postProps.unpertinent, unpertinent])

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
        uid && unpertinent === false && (
            <img src="./img/icons/heart.svg" onClick={findUnpertinent} alt="like"/>
        )}

        {
        uid && unpertinent && (
            <img src="./img/icons/heart-filled.svg" onClick={findUnpertinentAnymore} alt="unLike" />
        )}
        <span>{postProps.unpertinent.length}</span>
    </div>
  )
}
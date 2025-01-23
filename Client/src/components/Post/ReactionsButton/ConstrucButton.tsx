import { useContext, useEffect, useState } from "react"
import { UidContext } from "../../AppContext"
import { findPostConstructive, constructiveAnymore} from "../../../redux/actions/post.action"
import { useDispatch } from "react-redux"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export const ConstrucButton = (postProps:any) => {
    const [constructive, setConstructive] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const findConstructive = () => {
        dispatch(findPostConstructive(postProps._id, uid))
        setConstructive(true)
    }
    const findConstructiveAnymore = () => {
        dispatch(constructiveAnymore(postProps._id, uid))
        setConstructive(false)
    }

    useEffect(() => {
        if (postProps.constructive.includes(uid)) setConstructive(true)
        else setConstructive(false)
    }, [uid, postProps.constructive, constructive])

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
        uid && constructive === false && (
            <img src="./img/icons/heart.svg" onClick={findConstructive} alt="like"/>
        )}

        {
        uid && constructive && (
            <img src="./img/icons/heart-filled.svg" onClick={findConstructiveAnymore} alt="unLike" />
        )}
        <span>{postProps.constructive.length}</span>
    </div>
  )
}

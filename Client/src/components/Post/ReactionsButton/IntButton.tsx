import { useContext, useEffect, useState } from "react"
import { UidContext } from "../../AppContext"
import { findPostInteresting, interestingAnymore} from "../../../redux/actions/post.action"
import { useDispatch } from "react-redux"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export const IntButton = (postProps:any) => {
    const [interesting, setInteresting] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const findInteresting = () => {
        findPostInteresting(postProps._id, uid, dispatch)
        setInteresting(true)
    }
    const findInterestingAnymore = () => {
        interestingAnymore(postProps._id, uid, dispatch)
        setInteresting(false)
    }

    useEffect(() => {
        if (postProps.interesting.includes(uid)) setInteresting(true)
        else setInteresting(false)
    }, [uid, postProps.interesting, interesting])

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
        uid && interesting === false && (
            <img src="./img/icons/heart.svg" onClick={findInteresting} alt="like"/>
        )}

        {
        uid && interesting && (
            <img src="./img/icons/heart-filled.svg" onClick={findInterestingAnymore} alt="unLike" />
        )}
        <span>{postProps.interesting.length}</span>
    </div>
  )
}
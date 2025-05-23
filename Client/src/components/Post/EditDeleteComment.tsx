
import { useState, useEffect, useContext } from "react";
import {deleteComment, editComment} from "../../redux/actions/post.action"
import {useDispatch} from "react-redux"
import { UidContext } from "../AppContext";


type props = {
  _id: string,
  postId: string,
  commenterId: string,
  text: string
}

export const EditDeleteComment = (props: props) => {
  type appDispatch =() => any

  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [commentText, setCommentText] = useState(props.text)
  const uid = useContext(UidContext)
  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  const handleEdit = (e:any)=> {
    e.preventDefault()

    if (commentText) {
        editComment(props.postId, props._id, commentText, dispatch)
        setCommentText("")
        setEdit(false)
    }
}

  const handleDelete = () => {
      deleteComment(props.postId, props._id, dispatch)
  }

  useEffect(()=> {
      const checkAuthor = () => {
          if (uid === props.commenterId) {
              setIsAuthor(true)
          }
      }
      checkAuthor()
  }, [uid, props._id])

  return (
    <div>
        {isAuthor && edit === false && (
            <span onClick={()=> setEdit(!edit)}>
                Editer
            </span>
        )}
        {isAuthor && edit && (
            <form action='' onSubmit={handleEdit}>
                <label htmlFor='text' onClick={()=> setEdit(!edit)}>
                    Annuler les modifications
                </label>
                <br/>
                <input type="text" name='text' onChange={(e)=> setCommentText(e.target.value)}
                defaultValue={props.text}/>
                <input type="submit" value="Valider les modifications"/>
                <br/>
            </form>
        )}
        {isAuthor && (
            <span onClick={()=> {
                if (window.confirm("Voulez vous supprimer ce commentaire ?")) {
                    handleDelete()
                }
            }}
            >
                Supprimer
            </span>
        )}
    </div>
  )
}




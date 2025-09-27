import { useDispatch } from 'react-redux'
import { deletePost } from '../../redux/actions/post.action'

type propsType = {
    id: string, 
    text: string
  }

export default function DeletePostCard(props:propsType) {
  const dispatch = useDispatch()
  const deleteQuote = () => deletePost(props, dispatch)
  return (
    <div 
      onClick={() => {
        if (window.confirm('Voulez vous supprimer cet article ?')){
          deleteQuote()
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="" />
      
    </div>
  )
}

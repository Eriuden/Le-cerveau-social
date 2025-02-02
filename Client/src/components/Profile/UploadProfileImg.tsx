import { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { uploadPicture } from "../../redux/actions/user.action"

export const UploadProfileImg = () => {
    const [file, setFile] = useState("")
    const dispatch = useDispatch()
    const userData = useSelector((state:any) => state.userReducer)

    const handlePicture = (e:any) => {
        e.preventDefault();
        const data = new FormData()        
        data.append("name", userData.pseudo)
        data.append("userId", userData._id)
        data.append("file", file)
        dispatch(uploadPicture(data, userData._id))
    }
  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
          <label htmlFor='file'>Changer d'image</label>
          <input type="file" 
            id="file" 
            name="file" 
            accept='.jpg, .jpeg, .png' 
            onChange={(e:any) => setFile(e.target.files[0])}/>
            <br/>
            <input type ="submit" value ="envoyer" />
      
      </form>
  )
}


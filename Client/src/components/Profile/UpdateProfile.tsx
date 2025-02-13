import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions/user.action
import {UploadProfileImg} from "./UploadProfileImg"
import { dateParser } from '../Utils'
import FollowHandler from './followHandler'

export default function UpdateProfil() {
    const userData = useSelector((state: any) => state.userReducer)
    const usersData = useSelector((state:any) => state.usersReducer)
    const error = useSelector((state:any) => state.errorReducer.userError)
    const [name, setName] = useState(userData.name)
    const [updateForm, setUpdateForm] = useState(false)  
    const [followingPopUp, setFollowingPopUp] = useState(false)
    const [followersPopUp, setFollowersPopUp] = useState(false)
    const dispatch = useDispatch()

  

    const handleUpdate = () => {
      updateUser(userData._id, name, email, message, dispatch)
      setUpdateForm(false)
    }

  return (
    <div className="profil-container">

        <h1> Profil de {userData.name}</h1>

        <div className="update-container">

            <div className="left-part">
                <h3>Photo de profil</h3>
                <img src={userData.picture} alt="user-pic" />
                <UploadProfileImg />
                <p>{error.maxSize}</p>
                <p>{error.format}</p>
                
            </div>

            <div className="right-part">

              <div className="name-update">

                <h3>Nom d'utilisateur</h3>
                {
                  updateForm === false && (
                  <>
                    <p onClick={() => setUpdateForm(!updateForm)}>{userData.name}</p>
                    <button onClick={() =>setUpdateForm(!updateForm)}>Modifier Nom</button>
                  </>
                )}
                {
                  updateForm &&(
                  <>
                    <textarea type="text" defaultValue={userData.name}onChange={(e) => setName(e.target.value)}>
                    </textarea>
                    <button onClick={handleUpdate}>Valider la modification</button>
                  </>
                )}

              </div>

              <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
                  <h5 onClick={() => setFollowingPopUp(true)}>Abonnements: {userData.following ? userData.following.length: "0"}</h5>
                  <h5 onClick={() => setFollowersPopUp(true)}>Abonnés : {userData.follwers ? userData.follwers.length: "0"}</h5>

            </div>

        </div>

        {
          followingPopUp &&
          <div className='popup-profil-container'>

            <div className='modal'>

              <h3>Abonnements</h3>
              <span className='cross' onClick={()=>setFollowingPopUp(false)}>&#10005;</span>
              <ul>
                {usersData.map((user:any) => {
                  for (let i = 0; i <userData.following.length; i++) {
                    if(user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt= "user-pic" />
                          <h4>{user.pseudo}</h4>
                          <FollowHandler idToFollow={`${user._id}`} type="suggestion"/>
                        </li>
                      )
                    }
                  }
                  return null;
                })}
              </ul>
            </div>  
          </div>
          }

       {followersPopUp &&
          <div className='popup-profil-container'>

            <div className='modal'>

              <h3>Abonnements</h3>
              <span className='cross' onClick={()=>setFollowersPopUp(false)}>&#10005;</span>
              <ul>
                
                {usersData.map((user:any) => {
                  for (let i = 0; i <userData.followers.length; i++) {
                    if(user._id === userData.followers[i]) {

                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt= "user-pic" />
                          <h4>{user.name}</h4>

                          <div className="follow-handler">
                          <FollowHandler idToFollow={`${user._id}`} tpe="suggestion"/>
                          </div>

                        </li>
                      )
                    }
                    
                  }
                  return null;
                })}
              </ul>
            </div>  
          </div>
          }
    </div>
  )
}
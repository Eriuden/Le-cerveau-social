import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from "../../redux/actions/user.action"
import { isEmpty } from '../Utils'

export default function FollowHandler( idToFollow:string, idToUnfollow: string, type:string) {
  const userData = useSelector((state:any) => state.userReducer)
  const [isFollowed, setIsFollowed] =useState(false)
  const dispatch = useDispatch()

  
  const handleFollow = () => {
    followUser(userData._id, idToFollow, dispatch)
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    unfollowUser(userData._id, idToUnfollow, dispatch)
    setIsFollowed(false)
  }

  useEffect(() => {

    if (isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true)
      } else setIsFollowed(false)
    }
  }, [userData], idToFollow)
  
  return (

    <>

    {
      isFollowed && !isEmpty(userData) && (
      <span onClick={handleUnfollow}>
        {type === "suggestion" && <button className='unfollow-btn'>Abonné</button>}
        {type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
      </span>
    )}

    { 
      isFollowed === false &&  !isEmpty(userData) && (
      <span onClick={handleFollow}>
      {type === "suggestion" && <button className='follow-btn'>S'abonner</button>}
      {type === "card" && <img src="./img/icons/check.svg" alt="checked" />}
    </span>
    )}

    </>
  )
}


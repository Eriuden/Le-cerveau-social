import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from "../../redux/actions/user.action"
import { isEmpty } from '../Utils'

type followProps = {
  idToFollow: string,
  idToUnfollow: string,
  type: string
}

export default function FollowHandler( props: followProps) {
  const userData = useSelector((state:any) => state.userReducer)
  const [isFollowed, setIsFollowed] =useState(false)
  const dispatch = useDispatch()

  
  const handleFollow = () => {
    followUser(userData._id, props.idToFollow, dispatch)
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    unfollowUser(userData._id, props.idToUnfollow, dispatch)
    setIsFollowed(false)
  }

  useEffect(() => {

    if (isEmpty(userData.following)) {
      if (userData.following.includes(props.idToFollow)) {
        setIsFollowed(true)
      } else setIsFollowed(false)
    }
  }, [userData])
  
  return (

    <>

    {
      isFollowed && !isEmpty(userData) && (
      <span onClick={handleUnfollow}>
        {props.type === "suggestion" && <button className='unfollow-btn'>Abonné</button>}
        {props.type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
      </span>
    )}

    { 
      isFollowed === false &&  !isEmpty(userData) && (
      <span onClick={handleFollow}>
      {props.type === "suggestion" && <button className='follow-btn'>S'abonner</button>}
      {props.type === "card" && <img src="./img/icons/check.svg" alt="checked" />}
    </span>
    )}

    </>
  )
}


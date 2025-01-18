import { useState, useContext, useEffect } from "react";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom
import { UidContext } from "./AppContext";
import {squash as Hamburger} from "hamburger-react"
import { Logout } from "./Log/Logout";
import { ConnexionModal } from "./Log/ConnexionModal";
import { inscriptionModal } from "./Log/inscriptionModal";
import * as ReactModal from "react-modal"

const Header = () => {
  const [hamburger, setHamburger] = useState(false)
  const [connexionModal, setConnexionModal] = useState(false)
  const [inscriptionModal, setInscriptionModal] = useState(false)
  const [uidPic, setUidPic] = useState("")
  
  const uid = useContext(UidContext)

  const userData = useSelector((state: any)=> state.userReducer)

  const switchConnexion = () => {
    setConnexionModal(!connexionModal) 
    setInscriptionModal(false)
  }

  const switchInscription = () => {
    setInscriptionModal(!inscriptionModal) 
    setConnexionModal(false)
  }

  useEffect(()=> {
    if (uid) {
      setUidPic(`${userData.picture}`)
    }
  },[uid, userData])
  return (
    <div>
      
    </div>
  )
}

export default Header

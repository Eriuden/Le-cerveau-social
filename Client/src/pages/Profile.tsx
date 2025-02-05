import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import UpdateProfil from "../components/Profile/UpdateProfile"

export default function Profil() {
  const uid = useContext(UidContext)
  return (
    <div className='profil-page'>
      {uid ? (
        <UpdateProfil/>
      ) : (
      <div className="log-container">
          <div className="img-container">
              <img src='../../public/img/log.svg' alt="l'image de log" />
          </div>
      </div>
      )}
    </div>
  )
}


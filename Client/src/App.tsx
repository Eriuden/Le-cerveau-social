import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UidContext } from './components/AppContext'
import { Profile } from './pages/Profile'
import { Trending } from './pages/Trending'
import { Home }  from './pages/Home'
import Header from './components/Header'
import axios  from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from './redux/actions/user.action'

function App() {

  type appDispatch = () => any

  const [uid, setUid] = useState(null)
  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchToken =async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
      setUid(res.data)
    })
    .catch(() => console.log("Pas de tokens"))
    }
    fetchToken()

    if (uid) dispatch(getUser(uid))
  }, [uid])

  return (
    <>
      <div>  
        <UidContext.Provider value ={uid}>
        Test
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profil" element={<Profile/>}/>
          <Route exact path="/trending" element={<Trending/>}/>
        </Routes>
        </UidContext.Provider>            
      </div>
    </> 
  )
}

export default App

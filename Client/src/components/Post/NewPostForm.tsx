import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getPosts } from "../../redux/actions/post.action"
import { isEmpty, timeStampParser } from '../Utils'

export default function NewPostForm(post: any) {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [picture, setPicture] = useState("")
    const [video, setVideo] = useState("")
    const [file, setFile] = useState("")
    const userData= useSelector((state:any) => state.userReducer)
    const errors = useSelector((state:any) => state.errorReducer.postError)
    const dispatch = useDispatch()

    const handlePicture = (e:any) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setVideo('')
    }   

    const handlePost = async() => { 
            if (message || picture || video) {
              const data = new FormData()
              data.append('posterId', userData._id)  
              data.append('message', message)
              if (file)data.append("file", file)
              data.append('video', video)
              
              await addPost(data, dispatch)
              getPosts(post, dispatch)
              cancelPost()
              
            } else {
              alert("veuillez entrer un message")
            }
    }

    const handlevideo = () => {
        let findLink = message.split(" ")
        for(let i =0; i < findLink.length; i++) {
            if(findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout') ) {
                let embed = findLink[i].replace('watch?v=', "embed/")
                setVideo(embed.split('&')[0])
                findLink.splice(i, 1)
                setMessage(findLink.join(" "))
                setPicture("")
            }
        }
    }

    const cancelPost = () => {
        setMessage("")
        setPicture("")
        setVideo("")
        setFile("")
    }

    useEffect(() => {
        if (!isEmpty(userData)) 
            setIsLoading(false)
            handlevideo()
    }, [userData, message, video])

  return (
    <div className='post-container'>
        {isLoading ? (
            <i className='fas fa-spinner fa-pulse'></i>
        ) : (
            <>
                <div className="data">
                    <p>
                        <span>
                            { userData.following ? userData.following.length : 0}</span>{" "}
                        <span>Abonnements:</span>
                    </p>

                    <p>
                        <span>
                            { userData.followers ? userData.followers.length : 0}</span>{" "}
                        <span>Abonnés:</span>
                    </p>
                
                </div>

                <Link to={"/profil"}>
                    <div className="user-info">
                        <img src={userData.picture} alt="user-img" />
                    </div>
                </Link>
                <div className="post-form">
                    <textarea name="message" id="message" 
                    placeholder='Quoi de neuf' 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message} 
                    />
                    {message || picture || video.length > 20 ? (
                        <li className="card-container">
                            <div className="card-left">
                                <img src={userData.picture} alt="user-pic" />
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>{userData.pseudo}</h3>
                                    </div>
                                    <span>{timeStampParser(Date.now())}</span>
                                </div>
                                <div className="content">
                                    <p>{message}</p>
                                    <img src={picture} alt="" />
                                    {video && (
                                        <iframe
                                        src={video}
                                        frameBorder="0"
                                        allow='accelerometer; autoplay; clipboard-write;
                                        encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                        title={video}></iframe>
                                    )}
                                </div>
                            </div>
                        </li>
                    ) : null}
                
                    <div className="footer-form">
                        <div className="icon">
                            {isEmpty(video) && (
                                <>
                                <img src="./img/icons/picture.svg" alt="img" />
                                <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg .png /"
                                onChange={(e) => handlePicture(e)} />
                                </>
                            )}
                            {video && (
                                <button onClick={() => setVideo("")}>Supprimer la vidéo</button>
                            )}
                        </div>
                        {!isEmpty(errors.format) && <p>{errors.format}</p>}
                        {!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}

                        <div className="btn-send">
                            {message || picture ||video.length > 20 ? (
                                <button className='cancel' onClick={cancelPost}>Annuler message</button>
                            ) : null}

                            <button className='send' onClick={handlePost}>Envoyer</button>                          
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
    
  )
}

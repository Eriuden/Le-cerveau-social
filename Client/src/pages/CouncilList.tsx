import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCouncils } from "../redux/actions/council.action"
import { isEmpty } from "../components/Utils"

export const CouncilList = () => {
  const [loadCard, setLoadCard] = useState(false)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch
  const councils = useSelector((state:any)=> state.allCouncilsReducer)

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight)
      {
        setLoadCard(true)
      } else {
        setLoadCard(false)
      }
  }

  useEffect(()=> {
    if (loadCard) {
      getCouncils(count, dispatch)
      setCount(count + 10)
    }
    window.addEventListener("scroll", loadMore)
  }, [loadCard,dispatch, count])

  return (
    <div>
      {!isEmpty(councils[0]) &&
              councils.map((council:any) => {
                return (
                  <div>
                    <h2>{council.name}</h2>
                    <h3>{council.theme}</h3>
                    <img src={council.banner}/>
                  </div>
                )
                  
            })}
    </div>
  )
}

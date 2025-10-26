/*ressource nécessaire
    des comptes users, mais également des comptes modos 
    des posts (aavec les fameuses réactions entre autres)
    des groupes de discussions, appelons les conseils (thèmes à trouver, comme art, philo, sport, etc...)
    un système de modo par IA
*/

const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
require("dotenv").config({path:"./config/.env"})
require("./config/db")
const {checkUser, requireAuth} = require("./middleware/auth.middleware")
const cors = require("cors")

const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const councilRoute = require("./routes/council.route")

const app = express()

app.use(cors({origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin : process.env.CLIENT_URL,
    credentials: true,
    "allowedHeaders" : ["sessionId", "content-type"],
    "exposedHeaders" : ["sessionId"],
    "methods" : "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue":false
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("*", checkUser)
app.get("jwtid", requireAuth, (res) => {
    res.statusCode(200).send(res.locals.user_id)
})

app.use("api/user", userRoute)
app.use("api/post", postRoute)
app.use("api/council", councilRoute)
app.use('/api/messages', messageRoutes)

app.listen(process.env.PORT, ()=> {
    console.log(`Nous pouvons nous installer en place ${process.env.PORT}`)
})
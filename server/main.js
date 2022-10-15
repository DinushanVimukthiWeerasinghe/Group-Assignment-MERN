import Express from 'express'
import {Database,UsersCollection,VoteDb} from './db/connect.js'
import ENV from "./core/HandleEnv.js";
import cors from 'cors'
import Authentication from './Routes/Authentication.js'
import User from './Routes/API/Voter.js'
import App from "./core/Application.js";
import Candidate from "./Routes/API/Candidate.js";
import Voter from "./Routes/API/Voter.js";
import Election from "./Routes/API/Election.js";
const port= ENV.PORT



Database.connect().then(() => {
    console.log("Connected to Database")
}).catch((err) => {
    console.log(err)
})
App.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true,
}))
App.use(Express.urlencoded({extended:false}))
App.use(Express.json())


//Assign the routes
// App.use('/api/voter',Voter)
// App.use('/api/user',User)
App.use('',User)
App.use('/candidate',Candidate)
App.use('/auth',Authentication)
App.use('/vote',Voter)
App.use('/election',Election)


App.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

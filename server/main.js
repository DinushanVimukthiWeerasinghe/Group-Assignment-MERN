import Express from 'express'
import Database from './db/connect.js'
import ENV from "./core/HandleEnv.js";

//Get the port from the environment variable
const port= ENV.PORT

//Create the express app
const App= Express()

Database.connect().then(() => {
    console.log('Connected to database')
})
App.get('/', (req, res) => {
    res.send('Lets get started')
})


App.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

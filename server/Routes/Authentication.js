import router from "./index.js";
import {Database as User, Database} from "../db/connect.js";
import passport from "../Authenticate/PassportConfig.js";
import bcrypt from "bcrypt";

const TestUser={
    _id: 2,
    name: "Demo User",
    email: "Demo Mail",
    password: "1234",
}
const IsAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/logins')
}
const IsNotAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/login')
    }
    next()
}

router.post('/register', async (req, res) => {
    try {
        const result=await Database.InsertOne("users",TestUser)
        res.send({message: "User Registered",result: result})
    } catch (error) {
        if(error.code===11000){
            res.status(400).send({message: "User already exists"})
        }else{
            res.status(400).send({message: "Error registering user"})
        }
    }
})
router.get('/login', IsAuthenticated,async (req, res) => {
    res.json({message: "User Logged In",user:await req.user || null})
})
router.get('/getUser',IsAuthenticated, async (req, res) => {
    res.json({message: "User Logged In",user: req.user})
})
router.get('/logins',IsNotAuthenticated, async (req, res) => {
    res.json({message: "User Not Logged In"})
})

router.post('/login',passport.authenticate('local',{
    failureRedirect:'/logins',
    failureMessage: true
}), (req, res) => {
    res.json({message: "User Logged In",user: req.user})

})
router.get('/logout', (req, res) => {
    req.logout(function(err){
        if (err) {
            return next(err);
        }
        res.json({success:true,message: "User Logged Out"})
    })
})
router.get('/setup',async (req,res)=>{
    const exist=await User.findOne("users",{username:'admin'})
    if(exist){
        res.send({message: "User already exists"})
    }else{
        bcrypt.genSalt(10,function(err,salt){
            if (err) return next(err)
            bcrypt.hash("pass",salt,function(err,hash){
                const TestUser={
                    _id: 2,
                    username: "admin",
                    email: "Demo Mail",
                    password: hash,
                }
                User.InsertOne("users",TestUser)
                res.status(200).send({message: "User Registered"})

            })
        })
    }


})

export {IsNotAuthenticated,IsAuthenticated}
export default router
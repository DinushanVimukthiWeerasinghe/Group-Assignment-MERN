import router from "../index.js";
import bcrypt from "bcrypt";
import {Database} from "../../db/connect.js";

router.post('/addElection', async (req, res) => {
    const {name,description,candidates}=req.body
    try{
        const AlreadyCreated=await Database.findOne("Election",{name:name})
        if(AlreadyCreated){
            res.status(400).send({message: "Election Name already created"})
        }else{
            const result=await Database.InsertOne("Election",{
                _id:"vt"+bcrypt.hashSync(name,10),
                name:name,
                description:description,
                candidates:candidates
            })
            res.send({message: "Election added successfully"})
        }
    }catch (error) {
        console.log(error)
        res.status(400).send({message: "Error adding election"})
    }
})

router.post('/getElections', async (req, res) => {
    try{
        const {userId}=req.body
        const AlreadyVotedElect=await Database.find("users",{_id:userId})
        const AlreadyVoted=AlreadyVotedElect[0].votedElections
        const result=await Database.find("Election",{})
        const elections=[]
        for (let election of result) {
            if(!AlreadyVoted.includes(election._id)){
                elections.push(election)
            }
        }
        res.send(elections)
    }catch (error) {
        console.log(error)
        res.status(400).send({message: "Error getting elections"})
    }
})

router.post('/AssignCandidate', async (req, res) => {
    const {candidateId,voteId}=req.body
    try{
        const AlreadyACandidate=await Database.findOne("Election",{_id:voteId})
        const IsCandidate=await Database.findOne("candidates",{_id:candidateId})
        if(!IsCandidate) {
            res.status(400).send({message: "Candidate does not exist"})
        }
            // else if(AlreadyACandidate.candidate==null){
            //     const result=await Database.findOneAndUpdate("Election",{_id:voteId},{$push:{candidates:candidateId,votes:0,votedBy:[]}})
            //     res.send({message: "Candidate added successfully"})
            // }
        else if(AlreadyACandidate.candidate!==null && AlreadyACandidate.candidates.includes(candidateId)){
            res.status(400).send({message: "Candidate already added"})
        }else{
            let candidate={
                _id:candidateId,
                votes:0,
                votedBy:[]
            }
            const result=await Database.findOneAndUpdate("Election",{_id:voteId},{$push:{candidates:candidate}})
            res.send({message: "Candidate added successfully"})
        }
    }catch (error) {
        console.log(error)
        res.status(400).send({message: "Error adding candidate"})
    }
})
router.post('/RemoveCandidate', async (req, res) => {
    const {candidateId,voteId}=req.body
    try{
        const AlreadyACandidate=await Database.findOne("Election",{_id:voteId})
        const IsCandidate=await Database.findOne("votes",{_id:candidateId})
        if(!IsCandidate){
            res.status(400).send({message: "Candidate does not exist"})
        }
        else if(!AlreadyACandidate.candidates.includes(candidateId)){
            res.status(400).send({message: "Candidate not added"})
        }else{
            const result=await Database.findOneAndUpdate("Election",{_id:voteId},{$pull:{candidates:candidateId}})
            res.send({message: "Candidate removed successfully"})
        }
    }catch (error) {
        console.log(error)
        res.status(400).send({message: "Error removing candidate"})
    }
})

router.post('/RemoveElection', async (req, res) => {
    const {voteId}=req.body
    try{
        const result=await Database.findOneAndDelete("Election",{_id:voteId})
        res.send({message: "Election removed successfully"})
    }catch (error) {
        console.log(error)
        res.status(400).send({message: "Error removing election"})
    }
})


export default router
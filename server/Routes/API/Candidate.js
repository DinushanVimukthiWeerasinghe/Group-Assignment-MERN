import router from "../index.js";
import {Database} from "../../db/connect.js";
import bcrypt from "bcrypt";
const FindCandidate=async (NIC,party,position)=>{
    const result=await Database.getCollection("candidates").findOne({NIC: NIC,party:party,position:position})
    return !result;
}

router.post('/addCandidate', async (req, res) => {
    //TODO Image To Be added
    try {
        const {name,party,position,NIC}=req.body
        if(await FindCandidate(NIC, party,position)){
            const _id="Cd"+await bcrypt.hash(name+NIC, 10)
            const result = await Database.InsertOne("candidates", {name, party, position,_id,NIC})
            res.status(200).send({message: "Candidate Added", result: result})
        }else{
            res.status(400).send({message: "Candidate Already Exists"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Error adding candidate"})
    }
})
router.post('/updateCandidate', async (req, res) => {
    //TODO Image To Be added
    try {
        const {name,party,position,NIC,_id}=req.body
        const result =await Database.UpdateOne("candidates",{ _id:_id },{$set:{name:name,party:party,NIC:NIC,_id:_id,position:position}},true)
        res.status(200).send({message: "Candidate Updated", result: result})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Error updating candidate"})
    }
})
router.get('/getAllCandidates', async (req, res) => {
    try {
        const result = await Database.getCollection("candidates").find({}).toArray()
        res.send({message: "Candidates Fetched", result: result})
    } catch (error) {
        res.status(400).send({message: "Error fetching candidates"})
    }
})
router.post('/getCandidateInElection', async (req, res) => {
    const {electionId}=req.body
    try {
        const result = await Database.getCollection("candidates").find({electionId:electionId}).toArray()
        res.send({message: "Candidates Fetched", result: result})

    }catch (error) {
        res.status(400).send({message: "Error fetching candidates"})
    }

})
router.post('/getCandidate', async (req, res) => {
    try {
        const {id}=req.body
        const result = await Database.getCollection("candidates").find({_id:id}).toArray()
        res.send({message: "Candidates Fetched", result: result})
    } catch (error) {
        res.status(400).send({message: "Error fetching candidates"})
    }
})

router.post('/deleteCandidate', async (req, res) => {
    try {
        const id=await req.body.id
        const result = await Database.DeleteOne("candidates", {_id:id})
        res.send({message: "Candidate Deleted", result: result})
    } catch (error) {
        res.status(400).send({message: "Error deleting candidate"})
    }
})

export default router

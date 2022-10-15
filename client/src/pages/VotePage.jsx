import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IsLoggedIn} from "../Authentication/Auth.jsx";
import {Button, Card, Col, Row} from "react-bootstrap";
import election from "../assets/election.png";
import axios from "axios";
import Swal from 'sweetalert2'
import {NavbarComponent} from "../component/Navbar.jsx";

function DeleteVote(id) {
    return undefined;
}

export function VotePage(){
    const AlreadyVoted=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).voted : false;
    const IsElectionSelected=!!localStorage.getItem("SelectedElection");
    console.log(IsElectionSelected)
    const navigate = useNavigate();
    useEffect(() => {
        if(!IsLoggedIn()) {
            Swal.fire({
                title: 'You have to Login first',
                icon: 'error',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/")
                }
            })
        }
        if(AlreadyVoted)
        {
            Swal.fire({
                title: 'You have already voted!',
                text: 'Redirecting to Home Page....',
                icon: 'error',
                confirmButtonText: 'Ok',
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            })
            navigate("/home")
        }else if(!IsElectionSelected)
        {
            Swal.fire({
                title: 'You have to select an election first',
                text: 'Redirecting to Election Page....',
                icon: 'error',
                confirmButtonText: 'Ok',
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                timer: 1500,
                timerProgressBar: true,
            }).then((result) => {
                if(result.isDismissed)
                {
                    navigate("/election")
                }
            })
            // navigate("/election")
        }

    },[])
    let VoteUsed=false;
    const MakeVote=(id)=>{
        const CandidateId=id
        const ElectionId=JSON.parse(localStorage.getItem("SelectedElection"))._id
        const VoterId=JSON.parse(localStorage.getItem("user")).id
        const data={
            candidateId:CandidateId,
            ElectionId:ElectionId,
            VoterId:VoterId
        }
        axios({
            method: "POST",
            url: "http://localhost:5000/vote/addVote",
            withCredentials: true,
            data:data
        }).then((res)=>{
            console.log(res)

            if(res.data.success)
            {
                localStorage.removeItem("SelectedElection")
                localStorage.setItem("user", JSON.stringify({
                    username:JSON.parse(localStorage.getItem("user")).username,
                    id:JSON.parse(localStorage.getItem("user")).id,
                    email:JSON.parse(localStorage.getItem("user")).email,
                    voted:true
                }))
                Swal.fire({
                    title: 'Vote Successful!',
                    text: 'You have successfully voted',
                    icon: 'success',
                    confirmButtonText: 'Home'
                })
                navigate("/home")
            }
        })
    }

    if(!AlreadyVoted && IsElectionSelected)
    {
        console.log(AlreadyVoted)
        const SelectedElection =JSON.parse(localStorage.getItem("SelectedElection")) || null;
        if(!SelectedElection)
        {
            Swal.fire({
                title: 'No Election Selected!',
                text: 'Please select an election to vote',
                icon: 'error',
                customClass:'swal-fullscreen',
                confirmButtonText: 'View Election',
                showCancelButton: true,
                cancelButtonText: 'Home'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/election")
                } else if (result.isDismissed) {
                    navigate("/home")
                }
            })

        }
        const [CandidateInfo, setCandidateInfo] = useState([])
        const [Candidate, setCandidate] = useState([SelectedElection?SelectedElection.candidates: []]);
        const GetCandidateInfo=async ()=>{
            const res=await axios({
                method: "POST",
                url: "http://localhost:5000/candidate/getCandidateInElection",
                withCredentials: true,
                data: {
                    electionId: SelectedElection._id
                }
            }).then((res)=>{
                setCandidateInfo(prev=>[...res.data.result])
            })
        }
        useEffect(()=>{
            GetCandidateInfo().then(r=>console.log(r))

        },[])
        return (
            <div>
                <NavbarComponent/>
                <h1>Vote Page</h1>
                <Row xs={3} md={3} className="g-4">
                    {CandidateInfo.length!==0 ? CandidateInfo.map((item, index)=>(
                        <Col key={index}>
                            <Card style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={election} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.party}
                                    </Card.Text>
                                    <Card.Text>
                                        {item.position}
                                    </Card.Text>
                                    <div className="d-grid gap-2">
                                        <Button hidden={AlreadyVoted} variant="success" onClick={()=>MakeVote(item._id)}>{"Vote"}</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )):<h1>No El</h1>}
                </Row>
            </div>
        );
    }
}
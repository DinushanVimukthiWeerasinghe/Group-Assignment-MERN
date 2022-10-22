import {IsLoggedIn} from "../Authentication/Auth.jsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import {Button, Card, CardGroup, Col, Row} from "react-bootstrap";
import election from "../assets/election.png";
import Swal from "sweetalert2";
import {NavbarComponent} from "../component/Navbar.jsx";



export function ElectionPage(props) {
    const navigate = useNavigate();
    const [Election, setElections] = useState([]);

    const GetElection=async ()=>{
        const res=await axios({
            method: "POST",
            url: "http://localhost:5000/election/getElections",
            withCredentials: true,
            data: {
                userId: JSON.parse(localStorage.getItem("user")).id
            }
        })
        if(res)
        {
            setElections(prev=>{
                if(prev.length===0)
                {
                return [...res.data]
                }if(prev.length>0)
                {
                    return [...res.data]
                }
            })
        }

    }


    const SelectElection= (id)=>{
        const SelectedElection=Election.filter((ele)=> {
            return ele._id === id
        })
        localStorage.setItem("SelectedElection", JSON.stringify(SelectedElection[0]))
        navigate("/vote")
    }
    useEffect(() => {
        Swal.fire({
            customClass:'swal-fullscreen',
            background: '#a2c5c0',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading()
            },
            timer: 2000,
        })
        if(!IsLoggedIn()) {
            navigate("/");
        }
        GetElection().then(r => {
            console.log("Election", Election)
        });

    },[])

    return (
        <div>
            <NavbarComponent/>
            <h1>Election Page</h1>
            <Row xs={3} md={3} className="g-4">
                {Election.length!==0 ? Election.map((item, index)=>(
                        <Col key={index}>
                            <Card style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={election} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Button variant="primary" onClick={()=>SelectElection(item._id) }>View Candidates</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                )):<h1>No El</h1>}
            </Row>
        </div>
    )
}
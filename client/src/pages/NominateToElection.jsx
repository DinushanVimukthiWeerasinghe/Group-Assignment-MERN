import {Button, Card, Col, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {AddElection} from "../component/AddElection.jsx";
import Swal from "sweetalert2";
import axios from "axios";


export function NominateToElection(){
    const [showAddElection, setShowAddElection] = useState(false);
    const [showAddCandidate, setShowAddCandidate] = useState(false);

    const handleAddElectionClose = () => setShowAddElection(false);
    const handleAddCandidateClose = () => setShowAddCandidate(false);
    const handleAddElectionShow = () => setShowAddElection(true);
    const handleAddCandidateShow = () => setShowAddCandidate(true);

    const AddNewElection = () => {
        console.log("Adding new election");
        console.log(ElectionName);

        if(ElectionName.trim() === ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Election Name cannot be empty!',
            })
            }
        else if (ElectionDescription.trim() === ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Election Description cannot be empty!',
            })
        }else{
            axios.post("http://localhost:5000/election/addElection", {
                name: ElectionName,
                description: ElectionDescription,
                candidates: []
            }).then((response) => {
                console.log(response);
                if(response.status === 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Election Added Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    handleAddElectionClose();
                }
            })
        }


    }

    const [candidateName, setCandidateName] = useState("");
    const [ElectionName, setElectionName] = useState("");
    const [ElectionDescription, setElectionDescription] = useState("");

    const CandidateList=[
        {
            name:"Candidate1",
            id:1,
            value:"Candidate1"
        },
        {
            name:"Candidate2",
            id:2,
            value:"Candidate2"
        },
        {
            name:"Candidate3",
            id:3,
            value:"Candidate3"
        }
    ]
    const ElectionList=[
        {
            name:"Election1",
            id:1,
            value:"Election1"
        },
        {
            name:"Election2",
            id:2,
            value:"Election2"
        },
        {
            name:"Election3",
            id:3,
            value:"Election3"
        }
        ]


    return (
        <div>
            <Row>
                <Col>
                    <Card style={{ width: '18rem',cursor:"pointer" }}  onClick={handleAddCandidateShow}>
                        <Card.Img variant="top" src="holder.js/100px180?text=Add Candidate&theme=sky" />
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem',cursor:"pointer" }}  onClick={handleAddElectionShow}>
                        <Card.Img variant="top" src="holder.js/100px180?text=Add Election&theme=sky" />
                    </Card>
                </Col>
            </Row>
            <Modal show={showAddElection} onHide={handleAddElectionClose}>
                <Modal.Header closeButton className="text-center">
                    <Modal.Title>Add New Election</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col className="g-2">
                            <Row className="my-2 px-2">
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Election Name"
                                >
                                    <Form.Control type="text" placeholder="Election Name" onChange={(e)=>{setElectionName(e.target.value)}} />
                                </FloatingLabel>
                            </Row>
                            <Row className="my-2 px-2">
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Description"
                                >
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Election Description"
                                        style={{ height: '100px' }}
                                        onChange={(e)=>{setElectionDescription(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddElectionClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{AddNewElection()}}>
                        Add Election
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAddCandidate} onHide={handleAddCandidateClose}>
                <Modal.Header closeButton className="text-center">
                    <Modal.Title>Add New Candidate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col className="g-2">
                            <Row className="mt-2">
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Works with selects"
                                >
                                    <Form.Select aria-label="Floating label select example">
                                        {CandidateList.map((candidate)=>{
                                            return <option key={candidate.id} value={candidate.value}>{candidate.name}</option>
                                        })}
                                    </Form.Select>
                                </FloatingLabel>
                            </Row>
                            <Row className="mt-2">
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Works with selects"
                                >
                                    <Form.Select aria-label="Floating label select example">
                                        {ElectionList.map((election)=>{
                                            return <option key={election.id} value={election.value}>{election.name}</option>
                                        })}
                                    </Form.Select>
                                </FloatingLabel>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddCandidateClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddCandidateClose}>
                        Add Candidate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
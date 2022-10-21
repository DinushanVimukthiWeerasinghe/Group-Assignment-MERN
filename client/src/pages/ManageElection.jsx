import {IsLoggedIn} from "../Authentication/Auth.jsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import {Button, Card, CardGroup, Col, Row} from "react-bootstrap";
import election from "../assets/election.png";
import Swal from "sweetalert2";
import {NavbarComponent} from "../component/Navbar.jsx";



export function ManageElection() {

    return (
        <div>
            <NavbarComponent/>
            <h1>Manage Election</h1>
            <Row xs={3} md={3} className="g-4">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={election} />
                        <Card.Body>
                            <Button variant="outline-success">Add Election</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={election} />
                        <Card.Body>
                            <Button variant="outline-primary">Edit Election</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={election} />
                        <Card.Body>
                            <Button variant="outline-danger">Remove Election</Button>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>


        </div>
    )
}
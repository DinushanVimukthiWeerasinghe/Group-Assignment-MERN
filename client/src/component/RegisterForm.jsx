import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IsLoggedIn} from "../Authentication/Auth.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, FloatingLabel, InputGroup, Row} from "react-bootstrap";
import {NavbarComponent} from "./Navbar.jsx";
import {NavbarAuthComponent} from "./NavbarAuth";

export function RegisterForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [role, setRole] = useState("Voter");

    const Register = async () => {
        console.log("Registering");
        console.log(username);
        console.log(password);
        console.log(email);
        console.log(firstName);
        console.log(lastName);
        console.log(confirmPassword);
        console.log(role);
    }

    const HandleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }


    const navigate = useNavigate();
    useEffect(() => {
        if(!IsLoggedIn()) {
            navigate("/");
        }
    })
    return (
        <div>
            <NavbarAuthComponent/>
        <div className="border border-4 p-5 border-danger bg-gradient bg-primary bg-opacity-25">
            <h1 className="py-2">Register New User</h1>
            <div className="d-flex flex-column px-5 ">
                <Form onSubmit={HandleSubmit}>
                    <FloatingLabel
                        controlId="floatingInputEmail"
                        label="Email Address"
                        className="mb-3"
                    >
                        <Form.Control required type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" value={email} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                    <Row className="g-2">
                        <Col md>
                        <FloatingLabel
                            controlId="floatingInputFirstName"
                            label="First Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="name@example.com" />
                        </FloatingLabel>
                        </Col>
                        <Col md>
                        <FloatingLabel
                            controlId="floatingInputLastName"
                            label="Last Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}  placeholder="name@example.com" />
                        </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                        <FloatingLabel
                            controlId="floatingInputPassword"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="name@example.com" />
                        </FloatingLabel>
                        </Col>
                        <Col md>
                        <FloatingLabel
                            controlId="floatingInputCPassword"
                            label="Confirm Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="name@example.com" />
                        </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                        <FloatingLabel
                            controlId="floatingInputUserName"
                            label="User Name"
                            className="mb-3 "
                        >
                            <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="name@example.com" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Select Role"
                            >
                                <Form.Select  aria-label="Floating label select example" onChange={(e)=>setRole(e.target.value)}>
                                    <option  value="Voter">Voter</option>
                                    <option value="Candidate">Candidate</option>
                                    <option value="Manager">Manager</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <div className="mt-4 d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
        </div>
    );
}
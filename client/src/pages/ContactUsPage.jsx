import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {IsLoggedIn} from "../Authentication/Auth.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FloatingLabel, InputGroup, Navbar} from "react-bootstrap";
import {NavbarComponent} from "../component/Navbar.jsx";

export function ContactUsPage(){
    const navigate = useNavigate();
    useEffect(() => {
        if(!IsLoggedIn()) {
            navigate("/");
        }
    })
    return (
        <div>
            <NavbarComponent/>
            <h1 className="py-2">Contact Us Page</h1>
        <div className="d-flex flex-column px-5 ">
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="User Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Your Email"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Your Email"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <div className="mt-4 d-grid gap-2">
                        <Button variant="primary" size="lg">Submit</Button>
                    </div>
                </Form>
        </div>
        </div>
    );
}
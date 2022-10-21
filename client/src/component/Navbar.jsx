import {Button, Container, Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {IsLoggedIn} from "../Authentication/Auth.jsx";
const BaseUrl = "http://localhost:5000/logout"

export function NavbarComponent(){
    const navigate = useNavigate();
    const logout = () => {
        const user = localStorage.getItem('user')
        const id = JSON.parse(user).id
        axios({
            method: 'get',
            url: BaseUrl,
        }).then(res => {
            if(res.status === 200 && res.data.success){
                localStorage.removeItem('user')
                if(localStorage.getItem('SelectedElection')){
                    localStorage.removeItem('SelectedElection')
                }
                navigate('/')
            }
        })
    }
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Vote System</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    {/*<Nav.Link href="/vote">Vote Now</Nav.Link>*/}
                    <Nav.Link href="/election">Elections</Nav.Link>
                    <Nav.Link href="/contactus">Contact Us</Nav.Link>
                    <Nav.Link hidden={IsLoggedIn()} href="/register">Register</Nav.Link>
                </Nav>
                <Button hidden={!IsLoggedIn()} variant="outline-danger" onClick={logout}>LogOut</Button>
            </Container>
        </Navbar>
    )
}
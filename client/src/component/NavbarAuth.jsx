import {Button, Container, Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {IsLoggedIn} from "../Authentication/Auth.jsx";
const BaseUrl = "http://localhost:5000/logout"
import logo from "../assets/react.svg";

export function NavbarAuthComponent(){
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
                <Navbar.Brand href="/home" >
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Voting System
                </Navbar.Brand>
            </Container>
            <Button hidden={!IsLoggedIn()} className="px-3"  variant="outline-success" size="lg" onClick={logout}>LogIn</Button>
        </Navbar>
    )
}
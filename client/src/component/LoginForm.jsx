import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {IsLoggedIn} from "../Authentication/Auth.jsx";

// const BaseUrl = "http://webcode.me";
const BaseUrl = "http://localhost:5000/login";

export function LoginForm() {
    const navigate = useNavigate();
    // useEffect(() => {
    //     if(IsLoggedIn()) {
    //             navigate("/home");
    //     }
    // });
    const [username, setUserName] = useState('admin');
    const [password, setPassword] = useState('pass');
    const [message, setMessage] = useState('message');

    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        axios({
            method: 'post',
            url: BaseUrl,
            withCredentials: true,
            data: {
                username: username,
                password: password
            }
        }).then((res) => {
            console.log(res)
            if(res.data.user)
            {
                localStorage.setItem('user', JSON.stringify({
                    username:res.data.user.username,
                    id:res.data.user._id,
                    email:res.data.user.email,
                    voted:res.data.user.voted,
                    role:res.data.user.role
                }));
                navigate('/home');
            }
        }).catch((err) => {
            setMessage(err.message);
            console.log(err);
        })
    };
    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter User Name" onChange={onChangeUserName} value={username} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={onChangePassword} value={password}/>
            </Form.Group>
            <div className="d-grid gap-2">
            <Button variant="primary" onClick={onSubmit} size="lg">
                Log In
            </Button>
            </div>
        </Form>
            {message}
        </div>
    );
}


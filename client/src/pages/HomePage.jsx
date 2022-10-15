import {IsLoggedIn} from "../Authentication/Auth.jsx";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {NavbarComponent} from "../component/Navbar.jsx";

export function HomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!IsLoggedIn()) {
            navigate("/");
        }
    })
  return (
            <div>
                <NavbarComponent/>
                <h1>Home Page</h1>
            </div>
  );
}

import axios from "axios";

const IsLoggedIn = () => {
    // console.log("IsLoggedIn");
    return !!localStorage.getItem('user')
}

export {IsLoggedIn}
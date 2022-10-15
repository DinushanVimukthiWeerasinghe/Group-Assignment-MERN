import axios from "axios";

const IsLoggedIn = () => {
    return !!localStorage.getItem('user')
}

export {IsLoggedIn}
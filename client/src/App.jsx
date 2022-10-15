import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {ElectionPage} from "./pages/ElectionPage";
import {VotePage} from "./pages/VotePage";
import {ContactUsPage} from "./pages/ContactUsPage";
import React from "react";
import {RegisterForm} from "./component/RegisterForm.jsx";
import {NominateToElection} from "./pages/NominateToElection.jsx";



function App() {

  return (
      <div className="App">

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/election" element={<ElectionPage />} />
                <Route path="/vote" element={<VotePage />} />
                <Route path="/contactus" element={<ContactUsPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/nominate" element={<NominateToElection />} />
            </Routes>
      </div>
  )
}

export default App

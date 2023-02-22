import React from "react";
import Header from "../Header/header.jsx";
import {Link} from "react-router-dom";
import './footer.css'

function Footer() {
    return (
        <footer className="footer">
            <p className="footer-by">
                Alcohol abuse is bad for your health, please consume in moderation.
                <br/>
                Project realised by {" "}
                <Link to="/about">
                    a students' team
                </Link>
            </p>
        </footer>
    );
}

export default Footer;
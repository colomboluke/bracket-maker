import React from 'react';
import {FaGithub} from "react-icons/fa";
import {Link} from "react-router-dom";
import "./Home.css";

function HomePage() {
    return (
        <div className={"home-cont"}>
            <div className={"home-title-card"}>
                <h1 className={"home-title"}>Welcome to <span className={"title-color"}>Bracket Maker!</span>
                </h1>
                <h3 className={"home-subtitle"}>Bracket Maker lets you create and play March
                    Madness-style tournament brackets. Create a list of movies, songs, foods, or
                    anything else you can think of, get a group to vote for the winner of each
                    matchup, and Bracket Maker will help you decide your group's overall champion.</h3>
            </div>
            <div className={"home-main"}>
                <Link className={"link new-bracket-btn"}
                      to={"/create"}>New Bracket
                </Link>
                <Link to={"/help"}>
                    <button className={"home-ideas-btn"}>Need ideas? Click here</button>
                </Link>
            </div>
            <div className={"home-footer"}>
                <p className={"footer-p1"}>Made by Luke Colombo</p>
                <div className={"footer-p2"}>
                    <p>Check out my other projects here: </p>
                    <a href="https://github.com/lukecolombo03" target={"_blank"}
                       className={"footer-github-link"} rel="noreferrer">
                        <FaGithub className={"footer-github"}/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
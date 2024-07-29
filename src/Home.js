import React from 'react';
import {FaGithub} from "react-icons/fa";
import {Link} from "react-router-dom";

function Home() {
    // return (
    //     <div className={"home-cont"}>
    //         <h1>Home Page</h1>
    //         <p>Welcome to the Home Page</p>
    //     </div>
    // );

    return (
        <div className={"home-cont"}>
            <div className={"home-title-card"}>
                <h1 className={"home-title"}>Welcome to <span className={"title-color"}>Bracket Maker!</span>
                </h1>
                <h3 className={"home-subtitle"}>Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Atque commodi dolor eos nihil optio qui repellat. At
                    consectetur eum exercitationem illo incidunt perspiciatis repellat
                    sunt?</h3>
            </div>
            <div className={"home-main"}>
                <Link className={"link new-bracket-btn"}
                      to={"/create"}>New Bracket
                </Link>
                <button className={"home-ideas-btn"}>Need ideas? Click here</button>
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

export default Home;
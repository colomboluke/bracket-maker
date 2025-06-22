import React, {useState} from 'react';
import {FaGithub} from "react-icons/fa";
import {Link} from "react-router-dom";
import "./Home.css";

function HomePage({requestImport}) {
    const [showImportForm, setShowImportForm] = useState(false);
    const [bracketID, setBracketID] = useState("");
    const [asTemplate, setAsTemplate] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        console.log("Form submitted, bracket ID: ", bracketID, "Use as template?: ", asTemplate);
        setShowImportForm(false);
        requestImport(bracketID, asTemplate);
    }

    return (
        <div className={"home-cont"}>
            <div className={"home-title-card"}>
                <h1 className={"home-title"}>Welcome to <span className={"title-color"}>Bracket Maker!</span>
                </h1>
                <h3 className={"home-subtitle"}>Bracket Maker lets you create and play March
                    Madness-style tournament brackets. Make a list of movies, songs, foods, or
                    anything else you can think of, and get a group together to debate the winner of
                    each matchup. Bracket Maker will tally votes for each matchup, advance the
                    winning contenders until one remains, and crown the group's overall
                    champion.</h3>
            </div>
            <div className={"home-main"}>

                <button onClick={() => setShowImportForm(!showImportForm)}>Import Bracket</button>
                {showImportForm && (
                    <form onSubmit={onSubmit}>
                        <div className={"import-form-row"}>
                            <span>Bracket ID: </span>
                            <input type="text" name={"bracketID"} value={bracketID}
                                   onChange={e => setBracketID(e.target.value)}/>
                        </div>
                        <div className={"import-form-row"}>
                            <span>Use as template? </span>
                            <input type="checkbox" name={"asTemplate"}
                                   checked={asTemplate} onChange={e => setAsTemplate(e.target.checked)}/>
                        </div>
                        <button type={"submit"}>Import</button>
                    </form>
                )}

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
                    <a href="https://github.com/colomboluke" target={"_blank"}
                       className={"footer-github-link"} rel="noreferrer">
                        <FaGithub className={"footer-github"}/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {FaGithub, FaMousePointer, FaPrint} from "react-icons/fa";
import "./Header.css";

export default function Header({title, resetBracketVotes}) {
    const location = useLocation();
    const titleDisplay = (title === "" ? <h3 className={"bracket-title"}>Untitled Bracket</h3> :
                          <h3 className={"bracket-title"}>{title}</h3>)

    const navigate = useNavigate();

    // Guardrail when navigating away from the PlayPage before losing all progress
    function handleNavigateAway(toPath) {
        if (location.pathname === "/play") {
            if (window.confirm(
                "Navigating away from a bracket will lose all progress. Are you sure?")) {
                resetBracketVotes();
                navigate(toPath);
            }
        } else {
            navigate(toPath);
        }
    }

    return (
        <>
            <div className={"header"}>
                <div className={"header-left"}>
                        <span className={"link home-btn header-title"}
                              onClick={() => handleNavigateAway("/")}> Bracket
                            <span style={{fontWeight: "bold"}}> Maker</span>
                        </span>
                    <span className={"link header-new-bracket-btn"}
                          onClick={() => handleNavigateAway('/create')}>New Bracket</span>
                    <span className={"link header-ideas-btn"}
                          onClick={() => handleNavigateAway("/help")}>Get Ideas</span>
                    {(location.pathname === "/create" || location.pathname === "/play")
                     && titleDisplay}
                </div>
                <div className={"header-right"}>
                    {/*<p>Made by Luke Colombo</p>*/}
                    {/*TODO: when these are hovered, make text pop out that says "GitHub" or "Personal Portfolio"*/}
                    <a href="https://github.com/colomboluke" target={"_blank"}
                       rel="noreferrer">
                        <FaGithub className={"header-github"}/>
                    </a>
                    <a href="https://lukecolombo.me/" target={"_blank"} rel="noreferrer">
                        <FaMousePointer className={"header-portfolio"}/>
                        {/*<FaBriefcase className={"header-portfolio"}/>*/}
                    </a>
                </div>
            </div>
            <Outlet/>
        </>
    );
}
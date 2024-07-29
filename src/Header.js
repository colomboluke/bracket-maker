import {Link, Outlet, useLocation} from "react-router-dom";
import React from "react";
import {FaGithub, FaMousePointer} from "react-icons/fa";

export default function Header({title}) {
    const location = useLocation();
    const titleDisplay = (title === "" ? <h3 className={"bracket-title"}>Untitled Bracket</h3> :
                          <h3 className={"bracket-title"}>{title}</h3>)
    return (
        <>
            <div className={"header"}>
            <div className={"header-left"}>
                    <Link className={"link home-btn"} to={"/"}>
                        <span className={"header-title"}> Bracket
                            <span style={{fontWeight: "bold"}}> Maker</span>
                        </span>
                    </Link>
                    <Link className={"link header-new-bracket-btn"}
                          to={"/create"}>New Bracket
                    </Link>
                    <Link className={"link header-ideas-btn"} to={"/help"}>Get Ideas</Link>
                    {(location.pathname === "/create") && titleDisplay}
                </div>
                <div className={"header-right"}>
                    {/*<p>Made by Luke Colombo</p>*/}
                    {/*TODO: when these are hovered, make text pop out that says "GitHub" or "Personal Portfolio"*/}
                    <a href="https://github.com/lukecolombo03" target={"_blank"}
                       rel="noreferrer">
                        <FaGithub className={"header-github"}/>
                    </a>
                    <a href="https://lukecolombo.bio/" target={"_blank"} rel="noreferrer">
                        <FaMousePointer className={"header-portfolio"}/>
                        {/*<FaBriefcase className={"header-portfolio"}/>*/}
                    </a>
                </div>
            </div>
            <Outlet/>
        </>
    );
}
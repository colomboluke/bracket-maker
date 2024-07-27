import {Link, Outlet} from "react-router-dom";
import React from "react";
import {FaGithub, FaMousePointer} from "react-icons/fa";

export default function Header() {
    return (
        <>
            <div className={"header"}>
                <div className={"header-left"}>
                    <Link className={"home-btn"} to={"/"}>
                        <span className={"header-title"}> Bracket
                            <span style={{fontWeight: "bold"}}> Maker</span>
                        </span>
                    </Link>
                    <Link className={"header-new-bracket-btn"}
                          to={"/create"}>New Bracket
                    </Link>
                    <Link className={"header-ideas-btn"} to={"/help"}>Get Ideas</Link>
                    <Outlet />
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
        </>
    );
}
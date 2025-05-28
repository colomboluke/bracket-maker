import "./PlayPage.css"
import {FaPrint} from "react-icons/fa";
import React from "react";
export default function PlaySidebar({setShowPrintMenu, matchesComplete, totalMatches, onReset}) {

    const titleText = matchesComplete >= totalMatches ? "Completed" : "In Progress";

    // How full the progress bar should be
    const widthString = ((matchesComplete / totalMatches) * 100).toString().concat("%");

    return (
        <div className={"play-sidebar"}>
            <div className={"progress-cont"}>
                {/*<button onClick={() => console.log(widthString)}>Test</button>*/}
                <span>{titleText}</span>
                <div className={"progress-bar-outer"}>
                    <div className={'progress-bar-inner'} style={{width:`${widthString}`}}></div>
                </div>
                <span>{matchesComplete}/{totalMatches} Matches Complete</span>
            </div>
            <div className={"sidebar-btns"}>
                <button onClick={() => setShowPrintMenu(true)} className={"print-btn"}><FaPrint
                    className={"print-btn-icon"}/></button>
                <button className={"reset-btn"} onClick={onReset}>Reset</button>
            </div>
            <span className={"instruction-text"}>Click on a match or team to get started</span>
        {/*    TODO: mechanism to hide/show this screen*/}
        </div>
    )
}
import "./PlayPage.css"
import {FaPrint} from "react-icons/fa";
import React, {useState} from "react";

export default function PlaySidebar({
                                        setShowPrintMenu,
                                        matchesComplete,
                                        totalMatches,
                                        onReset,
                                        onShowChart,
                                        showInsights, requestExport, bracketTitle
                                    }) {
    const [showExportForm, setShowExportForm] = useState(false);
    const [bracketID, setBracketID] = useState(bracketTitle.toString());
    const [asPublic, setAsPublic] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        requestExport(bracketID, asPublic);
    }

    const bracketComplete = matchesComplete >= totalMatches

    const titleText = bracketComplete ? "Completed" : "In Progress";

    // How full the progress bar should be
    const widthString = ((matchesComplete / totalMatches) * 100).toString().concat("%");

    const insightsBtnText = showInsights ? "Hide Insights" : "Show Insights";

    return (
        <div className={"play-sidebar"}>
            <div className={"progress-cont"}>
                {/*<button onClick={() => console.log(widthString)}>Test</button>*/}
                <span>{titleText}</span>
                <div className={"progress-bar-outer"}>
                    <div className={'progress-bar-inner'} style={{width: `${widthString}`}}></div>
                </div>
                <span>{matchesComplete}/{totalMatches} Matches Complete</span>
            </div>
            <div className={"sidebar-btns"}>
                <button onClick={() => setShowPrintMenu(true)} className={"print-btn"}><FaPrint
                    className={"print-btn-icon"}/></button>
                <button className={"reset-btn"} onClick={onReset}>Reset</button>
            </div>
            {!bracketComplete && <span className={"instruction-text"}>Click on a match to get started</span>}
            {bracketComplete && <button onClick={() => onShowChart()} className={"insights-btn"}>{insightsBtnText}</button>}

            <button onClick={() => setShowExportForm(!showExportForm)}>Export Bracket</button>
            {showExportForm && (
                <form onSubmit={handleSubmit}>
                    <div className={"import-form-row"}>
                        <span>Bracket ID: </span>
                        <input type="text" name={"bracketID"} value={bracketID}
                               onChange={e => setBracketID(e.target.value)}/>
                    </div>
                    <div className={"import-form-row"}>
                        <span>Set public? </span>
                        <input type="checkbox" name={"asTemplate"}
                               checked={asPublic} onChange={e => setAsPublic(e.target.checked)}/>
                    </div>
                    <button type={"submit"}>Export</button>
                </form>
            )}
        </div>
    )
}
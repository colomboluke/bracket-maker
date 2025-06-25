import React, {useEffect, useRef, useState} from 'react';
import PlayableBracket from "./PlayableBracket";
import VotingScreen from "../Voting/VotingScreen";
import {Margin, Resolution, usePDF} from "react-to-pdf";
import PrintPopup from "../PrintScreen/PrintPopup";
import "./PlayPage.css";
import PlaySidebar from "./PlaySidebar";
import "../Charts/Charts.css";
import Dropdown from "../Charts/Dropdown";
import ChartContainer from "../Charts/ChartContainer";

export default function PlayPage({
                                     title,
                                     bracket,
                                     voters,
                                     onVote,
                                     getVoteCounts,
                                     resetVotes,
                                     resetBracket, requestExport, onNextPress
                                 }) {
    // Track the currently selected match using its ID
    const [selectedMatchID, setSelectedMatchID] = useState(null);
    let selectedMatch = bracket.getMatch(selectedMatchID);

    function handleMatchClick(matchID) {
        setSelectedMatchID(matchID);
    }

    let newTitle = 'Untitled Bracket';
    if (title !== undefined && title !== null && title !== "") {
        newTitle = title;
    }

    // Download screen visibility and options
    const [showPrintMenu, setShowPrintMenu] = useState(false);
    const [pdfFileName, setPdfFileName] = useState(`${newTitle}.pdf`);
    const [pdfFormat, setPdfFormat] = useState('letter');
    const [pdfOrientation, setPdfOrientation] = useState('portrait');
    const [includeHeader, setIncludeHeader] = useState(true);

    function handlePrintPopupClose() {
        setShowPrintMenu(false);
    }

    // Takes in all the state and checks it before passing off to toPDF
    function handleDownloadRequest() {
        // console.log(pdfFileName)
        toPDF();
    }

    // Download function
    const {toPDF, targetRef} = usePDF({
                                          filename: pdfFileName.toString(),
                                          page: {
                                              margin: Margin.NONE,
                                              format: pdfFormat.toString(),
                                              orientation: pdfOrientation.toString()
                                          },
                                          resolution: Resolution.MEDIUM
                                      });

    const totalMatches = bracket.countMatches();
    const completeMatches = bracket.countCompleteMatches();

    function handleResetWholeBracket() {
        if (window.confirm(
            "Are you sure you want you reset the votes of every match in the bracket?")) {
            resetBracket();
        }
    }

    const [showInsights, setShowInsights] = useState(false);
    const [chartID, setChartID] = useState(0);
    const chartDiv = useRef();

    function handleShowChartClick() {
        setShowInsights(!showInsights);
    }

    // Only scroll once the charts container is rendered
    useEffect(() => {
        if (showInsights) {
            chartDiv.current?.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [showInsights]);

    return (
        <div className={"play-bracket-cont"}>
            {/*Show overlay if VotingScreen or PrintMenu is displayed*/}
            {(selectedMatchID !== null || showPrintMenu) && (<div className={"overlay"}></div>)}
            {/*<div className={"play-bracket-title-cont"}>*/}
            {/*</div>*/}
            <PlaySidebar setShowPrintMenu={setShowPrintMenu} matchesComplete={completeMatches}
                         totalMatches={totalMatches} onReset={handleResetWholeBracket}
                         onShowChart={handleShowChartClick} showInsights={showInsights}
                         requestExport={requestExport} bracketTitle={title}/>
            {/*<input type="color" value={"pick color"}/>*/}
            <button onClick={() => console.log(bracket, voters)}>Log bracket</button>

            {/*This gets the ref because this is what will be printed*/}
            <PlayableBracket bracket={bracket} onClick={handleMatchClick}
                             getVoteCounts={getVoteCounts} ref={targetRef}/>

            {/*Voting screen popup*/}
            {selectedMatch !== null && <VotingScreen voters={voters} match={selectedMatch}
                                                     onVote={onVote}
                                                     onClose={() => setSelectedMatchID(null)}
                                                     onReset={() => resetVotes(selectedMatchID)}
                                                     matchLocked={selectedMatch.locked} onNextPress={onNextPress}/>}

            {/*Download/Print popup*/}
            {showPrintMenu && <PrintPopup onClose={handlePrintPopupClose} fileName={pdfFileName}
                                          setFileName={setPdfFileName} orientation={pdfOrientation}
                                          setOrientation={setPdfOrientation}
                                          onDownload={handleDownloadRequest} format={pdfFormat}
                                          setFormat={setPdfFormat}/>}
            <div className={"chart-cont"} ref={chartDiv}>
                {showInsights && <Dropdown
                    options={["Win Strength", "Voter Outlier", "Voter Similarity"]}
                    setActiveChart={setChartID} activeChart={chartID}/>}
                {showInsights && <ChartContainer bracket={bracket} activeChart={chartID}
                                                 voters={voters}
                                                 totalMatches={totalMatches}/>}
            </div>
        </div>

    );
}

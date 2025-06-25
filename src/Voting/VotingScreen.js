import UserRow from "./UserRow";
import "./Voting.css";
import {useEffect, useState} from "react";

export default function VotingScreen({
                                         match,
                                         voters,
                                         onVote,
                                         onClose,
                                         onReset,
                                         onNextPress
                                     }) {

    console.log(`Match ${match.id} locked?`, match.locked)
    const [selectedRow, setSelectedRow] = useState(null);

    // Handle key presses
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Close on 'esc' key press
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
            // Pressing enter closes it only if all votes are in
            if (e.key === 'Enter' && Object.values(match.votes).every(item => item !== 0)) {
                onClose();
            }
            // Choose which voter's row is selected
            if (e.key === 'ArrowUp') {
                if (selectedRow === null) {
                    setSelectedRow(0);
                } else {
                    setSelectedRow(Math.max(0, selectedRow - 1));
                }
            }
            if (e.key === 'ArrowDown') {
                if (selectedRow === null) {
                    setSelectedRow(0)
                } else {
                    setSelectedRow(Math.min(voters.length - 1, selectedRow + 1));
                }
            }
            // Cast a vote using left/right arrows
            if (e.key === "ArrowRight") {
                handleVoteLocal(voters[selectedRow].name, 2)
            }
            if (e.key === "ArrowLeft") {
                handleVoteLocal(voters[selectedRow].name, 1)
            }
        }

        // Clean up listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, match, selectedRow, voters, handleVoteLocal]);

    // useEffect(() => {
    //     console.log("Selected row is now: ", selectedRow)
    // }, [selectedRow]);

    // Whether all users have voted
    function allSelected() {
        // Make sure every value of match.votes is not 0
        return Object.values(match.votes).every(item => item !== 0);
    }

    // Whether any users have voted (no votes -> false)
    function anySelected() {
        return Object.values(match.votes).some(item => item !== 0);
    }

    let nextBtnStyle = allSelected() ? "active" : "";
    let resetBtnStyle = anySelected() ? "active" : "";

    function getWinnerString() {
        if (match.winner === null) {
            return "";
        } else {
            if (match.winner === 1) {
                return match.team1.name;
            } else {
                return match.team2.name;
            }
        }
    }

    function handleReset() {
        if (window.confirm("Are you sure you wish to reset votes? This may reset future rounds.")) {
            onReset()
        }
    }

    // Tell parent to update vote, give additional info that we're referring to this match
    // TODO: fix this dependency error
    function handleVoteLocal(voterName, vote) {
        onVote(match.id, voterName, vote);
    }

    const getTeamDisplay = (imageSrc, teamName) => {
        if (imageSrc) {
            return <div className={"voter-col"}>
                <div className={"option-title"}>{teamName}</div>
                <div className={"option-icon"}>
                    <img src={imageSrc} alt="Team 1" className={"voting-image"}/>
                </div>
            </div>
        } else {
            return <div className={"voter-col"}>
                <span className={"option-title no-image"}>{teamName}</span>
            </div>
        }
    }

    const header = <div className={"voter-row"}>
        {getTeamDisplay(match.team1.image, match.team1.name)}
        <div className={"voter-middle"}>
            <span className={"vs"}>VS.</span>
        </div>
        {getTeamDisplay(match.team2.image, match.team2.name)}
    </div>

    return (
        <div className={"voting-cont"}>
            <div className={"title-cont"}>
                <span className={"title"}>SELECT VOTES</span>
                <button onClick={onClose} className={"close-btn"}>&times;</button>
            </div>
            <div className={"voting-grid"}>
                {header}
                <div className={"voting-spacer"}></div>
                {voters.map((voter, idx) => (
                    // Receive vote status from the match object
                    // TODO: grey out plus buttons if this match is locked
                    <UserRow key={idx} voterName={voter.name} voteStatus={match.votes[voter.name]}
                             onClick={handleVoteLocal} selected={selectedRow === idx}
                             locked={match.locked}/>
                ))}
            </div>
            <div className={"voting-footer"}>
                <span className={"winner-text"}>WINNER: {getWinnerString()}</span>
                {!match.locked && (
                    <button className={`next-matchup-button ${nextBtnStyle}`}
                            disabled={!allSelected()}
                            onClick={() => {
                                onClose();
                                onNextPress(match.id)
                            }}>NEXT
                    </button>
                )}
                {match.locked && (
                    <div className={"voting-locked-spacer"}></div>
                )}
                <button className={`next-matchup-button ${resetBtnStyle} reset`}
                        disabled={!anySelected()}
                        onClick={handleReset}>RESET VOTES
                </button>
            </div>

        </div>

    )
}
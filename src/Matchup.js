import React from "react";

export default function Matchup({className, team1, team2, index}) {
    // Don't display anything if there's no team2
    const team1Text = (team1 !== null) ? team1.name + ": " + team1.votes : "";
    const team2Text = (team2 !== null) ? team2.name + ": " + team2.votes : "";

    return (
        <div className={`match-outer margin-${className}`}>
            <span className={"match-text"}>{team1Text}</span>
            <div className={`match-inner ${className}`}>
                <span className={"match-text"}>{team2Text}</span>
            </div>
        </div>
    )
}
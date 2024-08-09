import React from "react";

export default function Matchup({className, team1, team2, index}) {
    console.log("Matchup params:\t", index, team1, className);
    return (
        <div className={`match ${className}`}>{team1}{team2}</div>
    )
}
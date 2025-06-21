import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import constructBracket from "../BracketAlgos/ConstructBracket";
import Header from "../Header/Header";
import HomePage from "../Home/HomePage";
import SetupPage from "../Setup/SetupPage";
import IdeasPage from "../Ideas/IdeasPage";
import PlayPage from "../Play/PlayPage";
import {getVoteCounts} from "../Utils.mjs";
import { supabase } from "./Client";
import {getVoterInfo, parseDatabaseRecord} from "../BracketAlgos/ParseDatabaseRecord";
import {colorsBracket} from "../BracketAlgos/TestJSON.mjs";

/**
 * Top level component
 */
function App() {
    // Bracket title and description
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    // Teams array, which will get turned into a Bracket object
    const [teams, setTeams] = useState([]);
    // Voters array
    const [voters, setVoters] = useState([]);

    // constructBracket(): takes teams array and turns it into a bracket
    // Bracket is state because it changes over time from user input (vote tallies)
    const [bracket, setBracket] = useState(() => constructBracket(teams));
    // Update bracket when teams get changed
    useEffect(() => {
        setBracket(constructBracket(teams));
    }, [teams]);

    // TODO: connect to Supabase, create functions:
    //  Export: take a Bracket object and create a SQL Insert out of it
    //  Import: call the Retrieve Bracket query with the given ID as parameter, parse the result into a Bracket object

    async function fetchBracket(bracketID, asTemplate) {
        // Select a bracket matching the ID
        const { data, error } = await supabase
            // .from("bracket").select()
            .rpc('get_bracket', {p_id: bracketID})
        if (error) {
            alert(`Error fetching bracket with id ${bracketID}`)
        }
        const parseDBResult = parseDatabaseRecord(data);
        const bracket = parseDBResult[1];
        console.log("Parsed bracket: ", bracket)
        // Set the bracket state to the info that was just fetched
        setBracket(bracket);
        setTitle(parseDBResult[0].title);
        setDesc(parseDBResult[0].desc);

        // Handle whether this is a template or not
        if (asTemplate) {
            console.log("Creating a bracket template")
            setTeams(parseDBResult[1].matchesToTeams());
            setVoters([]);
            navigate("/create");
        } else {
            console.log("Creating full bracket: ")
            setVoters(getVoterInfo(parseDBResult[1]));
            navigate("/play");
        }

    }

    useEffect(() => {
        console.log("bracket is now: ", bracket)
    }, [bracket]);

    useEffect(() => {
        console.log("voters are now: ", voters)
    }, [voters]);

    // Import a bracket template
    const navigate = useNavigate();
    function handleImport(bracketID, asTemplate) {
        console.log("Bracket ID to be imported: ", bracketID)
        fetchBracket(bracketID, asTemplate)
    }

    // ~~~ Functions to update bracket ~~~

    function handleInitializeVotes() {
        let nextBracket = bracket.cleanCopy();
        nextBracket.initializeVoterObjects(voters);
        setBracket(nextBracket);
    }

    //Vote of 1 -> team 1. Vote of 2 -> team 2. Vote of 0 should not be possible
    function handleVote(matchID, voterName, vote) {
        if (vote !== 1 && vote !== 2) {
            throw new Error(`Unexpected vote value: (${vote}). Should be either 1 or 2.`)
        }

        let nextBracket = bracket.cleanCopy();
        const match = nextBracket.getMatch(matchID);
        const prevVote = match.votes[voterName];

        //if same as previous vote, do nothing
        if (prevVote === vote) {
            return;
        }
        // update match's votes
        let nextMatch = match.cleanCopy();
        nextMatch.updateVotes(voterName, vote);
        nextBracket.setMatch(nextMatch);

        // Update rest of bracket to reflect the outcome of this match
        nextBracket.handleMatchWinner(matchID, getWinner(nextMatch.votes));

        setBracket(nextBracket);
    }

    // Given a votes object, return 1 if the winner is team1, 2 if the winner is team2, or
    //  null if there is no winner
    function getWinner(votesObj) {
        // Count votes
        let counts = getVoteCounts(votesObj);
        if (counts === null) {
            return counts;
        }
        // Return the winner, throw error if there's a tie
        if (counts.team1 > counts.team2) {
            return 1;
        } else if (counts.team2 > counts.team1) {
            return 2;
        } else {
            throw new Error("There's a tie!");
        }
    }

    // Reset the votes for one match
    function resetVotes(matchID) {
        let nextBracket = bracket.cleanCopy();
        // Update match's votes
        const match = nextBracket.getMatch(matchID);
        match.resetVotes();
        nextBracket.setMatch(match);

        // Update rest of bracket to reflect the outcome of this match
        nextBracket.handleMatchReset(matchID);
        console.log("Bracket after resetting votes: ", nextBracket)
        setBracket(nextBracket);
    }

    function resetState() {
        setTitle("");
        setDesc("");
        setTeams([]);
        setVoters([]);
    }

    // Reset all matches in a bracket
    function resetAllBracketVotes() {
        let nextBracket = bracket.cleanCopy();
        nextBracket.resetAllVotes();
        setBracket(nextBracket);
    }

    function setTeamImage(teamID, image) {
        let nextBracket = bracket.cleanCopy();
        const team = nextBracket.getTeam(teamID);
        console.log("Setting image of team:", team)
        team.setImage(image);
        setBracket(nextBracket);
    }


    return (
        <Routes>
            <Route element={<Header title={title} resetBracketVotes={resetAllBracketVotes} bracketExists={bracket.matches.length > 0}/>}>
                <Route path="/" element={<HomePage requestImport={handleImport}/>}/>
                <Route path="create" element={<SetupPage title={title} setTitle={setTitle}
                                                         desc={desc} setDesc={setDesc}
                                                         teams={teams} setTeams={setTeams}
                                                         voters={voters}
                                                         setVoters={setVoters}
                                                         bracket={bracket}
                                                         onStart={handleInitializeVotes}
                                                         reset={resetState}
                setTeamImage={setTeamImage}/>}/>
                <Route path="help" element={<IdeasPage/>}/>
                <Route path="play" element={<PlayPage title={title} bracket={bracket}
                                                      voters={voters}
                                                      onVote={handleVote}
                                                      getVoteCounts={getVoteCounts}
                                                      resetVotes={resetVotes} resetBracket={resetAllBracketVotes}/>}/>
            </Route>
        </Routes>
    );
}

export default App;

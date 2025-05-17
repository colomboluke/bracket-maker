
export default function Settings({numTeams, createTeam, removeLastTeam, numVoters, createVoter, removeLastVoter, title, setTitle, desc, setDesc}) {

    function changeNumTeams(targetNum) {
        if (targetNum < 1) {
            return;
        }
        if (targetNum === numTeams) {
            return;
        }
        if (targetNum > numTeams) { //Add more teams
            createTeam();
        }
        if (targetNum < numTeams) { //Remove teams
            removeLastTeam();
        }
    }

    function changeNumVoters(targetNum) {
        if (targetNum < 1 || targetNum > 10) { //arbitrarily capping at 9 just for space
            return;
        }
        if (targetNum === numVoters) {
            return;
        }
        if (targetNum > numVoters) { //Add more voters
            createVoter()
        }
        if (targetNum < numVoters) { //Remove voters
            console.log(`Removing the last voter (total voters: ${numVoters})`)
            removeLastVoter()
        }
    }

    return (
        <div className={"settings"}>
            <div className={"settings-item"}>
                <h4>Number of Teams </h4>
                {/*TODO: change the number adjuster thing in CSS*/}
                {/*TODO: add a 'presets' dropdown which lets you pick any power of 2*/}
                <input value={numTeams} className={"settings-input num-teams-input"}
                       type={"number"}
                       onChange={e => {
                           changeNumTeams(e.target.valueAsNumber);
                       }}/>
            </div>
            <div className={"settings-item"}>
                <h4>Number of Voters</h4>
                <input value={numVoters} className={"settings-input num-teams-input"}
                       type={"number"}
                       onChange={e => {
                           changeNumVoters(e.target.valueAsNumber);
                       }}/>
            </div>
            <div className={"settings-item"}>
                <h4>Bracket Name</h4>
                <input value={title} className={"settings-input title-input"}
                       placeholder={"Untitled Bracket"}
                       maxLength={25}
                       onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className={"settings-desc"}>
                <h4 className={"desc-title"}>Description</h4>
                <textarea value={desc} className={"desc"}
                          maxLength={150}
                          onChange={e => setDesc(e.target.value)}/>
            </div>
        </div>
    )
}
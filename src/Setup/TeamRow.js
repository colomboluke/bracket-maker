import {CgRemove} from "react-icons/cg";

// Displays a team in the setup screen
export default function TeamRow({index, name, updateName, removeTeam}) {
    return (
        <>
            <div className={"seed"}>{index + 1}</div>
            <input value={name} type={"text"} className={"settings-input"}
                   onChange={e => {
                       updateName(index, e.target.value);
                   }}
                   placeholder={"Add Name"}/>
            <div className={"icon"}></div>
            <div className={"color"}></div>
            <div className={"remove"}><CgRemove className={"remove-btn"}
                                                onClick={() => removeTeam(index)}/></div>
        </>
    )
}
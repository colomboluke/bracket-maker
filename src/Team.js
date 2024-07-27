import {CgRemove} from "react-icons/cg";

export default function Team({index, name, updateName, removeTeam}) {
    return (
        <>
            <div className={"seed"}>{index + 1}</div>
            <input value={name} type={"text"} className={"settings-input"}
                   onChange={e => {
                       updateName(index, e.target.value);
                   }}
                   placeholder={"Add Name"}/>
            <div className={"icon"}>tbd</div>
            <div className={"color"}>tbd</div>
            <div className={"remove"}><CgRemove className={"remove-btn"}
                                                onClick={() => removeTeam(index)}/></div>
        </>
    )
}
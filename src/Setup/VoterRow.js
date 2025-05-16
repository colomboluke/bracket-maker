import {CgRemove} from "react-icons/cg";

export default function VoterRow({index, name, updateName, onRemove}) {
    return (
        <>
            <input value={name} type={"text"} className={"settings-input"}
                   onChange={e => {
                       updateName(name, e.target.value);
                   }}
                   placeholder={"Add Name"}/>
            <div className={"icon"}>to-do</div>
            <div className={"color"}>to-do</div>
            <div className={"remove"}><CgRemove className={"remove-btn"}
                                                onClick={() => onRemove()}/></div>
        </>
    )
}
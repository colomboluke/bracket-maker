import {CgRemove} from "react-icons/cg";
import "./TeamOrVoterAddGrid.css";
import {useState} from "react";

export default function VoterRow({index, id, name, updateName, onRemove}) {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className={"add-row voter-add-row"} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className={"voter-pos"}>{index + 1}</div>
            <input value={name} type={"text"} className={"settings-input"}
                   onChange={e => {
                       updateName(id, e.target.value);
                   }}
                   placeholder={"Add Name"}/>
            <div className={"icon"}>to-do</div>
            {isHovering && <div className={"remove"}><CgRemove className={"remove-btn"}
                                                               onClick={() => onRemove()}/></div>}

        </div>
    )
}
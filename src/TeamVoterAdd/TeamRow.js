import {CgRemove} from "react-icons/cg";
import "./TeamOrVoterAddGrid.css";
import {useState} from "react";

// Displays a team in the setup screen
export default function TeamRow({index, name, updateName, onRemove}) {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className={"add-row team-add-row"} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className={"seed"}>{index + 1}</div>
            <input value={name} type={"text"} className={"settings-input"}
                   onChange={e => {
                       updateName(index, e.target.value);
                   }}
                   placeholder={"Add Name"}/>
            <div className={"icon"}></div>
            <div className={"color"}></div>
            {isHovering && <div className={`remove`}><CgRemove
                className={"remove-btn"}
                onClick={() => onRemove()}/></div>}

        </div>
    )
}
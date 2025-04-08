import React, {useState} from "react";
import "./Voting.css";

export default function ButtonContainer() {
    // 0: neither selected. 1: left selected. 2: right selected
    const [buttonState, setButtonState] = useState(0);

    // Input: which button has been clicked
    // 1 = left, 2 = right
    function handleClick(input) {
        // If neither is currently selected, select whichever one was clicked
        setButtonState(input)
    }

    let leftColor = buttonState === 1 ? "selected" : "unselected";
    let rightColor = buttonState === 2 ? "selected" : "unselected";

    return (
        <div className={"buttons"}>
            <button className={`choice-btn ${leftColor}`} onClick={() => handleClick(1)}>Movie 1</button>
            <button className={`choice-btn ${rightColor}`} onClick={() => handleClick(2)}>Movie 2</button>
        </div>
    )
}
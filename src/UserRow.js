import React, {useState} from "react";
import "./Voting.css";

export default function UserRow({index, voterName, onClick}) {
    // 0: neither selected. 1: left selected. 2: right selected
    const [buttonState, setButtonState] = useState(0);

    // Input: which button has been clicked
    // 1 = left, 2 = right
    function handleClick(input) {
        // If neither is currently selected, select whichever one was clicked
        setButtonState(input);
        onClick(index, input);
    }

    let leftBtnStyle = buttonState === 1 ? "selected" : "unselected";
    let rightBtnStyle = buttonState === 2 ? "selected" : "unselected";

    let voteBtnText = "+"

    const leftButton = <button className={`vote-button ${leftBtnStyle}`}
                               onClick={() => handleClick(1)}>{voteBtnText}</button>
    const rightButton = <button className={`vote-button ${rightBtnStyle}`}
                                onClick={() => handleClick(2)}>{voteBtnText}</button>
    const voterNameSpan = <span className={"voter-name"}>{voterName}</span>
    let displayArray = [leftButton, voterNameSpan, rightButton]

    if (buttonState === 1) { //left button selected
        displayArray = [voterNameSpan, leftButton, rightButton]
    } else if (buttonState === 2) { //right button selected
        displayArray = [leftButton, rightButton, voterNameSpan]
    }

    return (
        <div className={"voter-row"}>
            <div className={"voter-col"}>
                {displayArray[0]}
            </div>
            <div className={"voter-col"}>
                {displayArray[1]}
            </div>
            <div className={"voter-col"}>
                {displayArray[2]}
            </div>
        </div>
    )

}
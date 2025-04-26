import React from "react";
import UserRow from "./UserRow";

export default function VotingGrid({voters}) {

    const gridStyle = {
        width: '40%',
        margin: 'auto',
        display: 'grid',
        gridTemplateRows: `repeat(${voters.length}, 1fr)`,
        border: `1px solid black`
    }

    const title = <div className={"voter-row"}>
        <div className={"voter-col"}>
            <div className={"option-title"}>Into the Spiderverse</div>
            <div className={"option-icon"}></div>
        </div>
        <div className={"voter-col"}>
            <span className={"vs"}>VS.</span>
        </div>
        <div className={"voter-col"}>
            <div className={"option-title"}>Cars</div>
            <div className={"option-icon"}></div>
        </div>
    </div>

    return (
        <div className={"voting-grid"}>
            {title}
            <div className={"voting-spacer"}></div>
            {voters.map((name, idx) => (
                <UserRow key={idx} voterName={name}/>
            ))}
        </div>
    )
}
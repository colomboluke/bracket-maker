export default function WinnerStub({teamName}) {

    return (
        <div className={"round final-round"}>
            <div className={"winner-stub"}>
                <span className={"winner-name"}>{teamName}</span>
            </div>
        </div>

    )
}
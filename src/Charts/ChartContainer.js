import {Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {marginOfVictory, voterOutlier} from "../BracketAlgos/PostGameStats.mjs";
import "../BracketAlgos/Bracket.mjs"
import {animatedMovies, popArtists, sevenVoters, testBracket1} from "../BracketAlgos/TestJSON.mjs";

export default function ChartContainer({activeChart, bracket, voters, totalMatches}) {

    const WinStrengthTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className={"stat-label"}>{label}</p>
                    <p className={"stat-content"}>{`Win strength: ${(payload[0].value
                                                                     * 100).toString()
                        .concat("%")}`}</p>
                    <p className={"stat-blurb"}>Percentage of votes this contender received across
                        all rounds</p>
                </div>
            );
        }
        return null;
    };

    const OutlierTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <span className={"stat-label"}>{label}</span>
                    <span className={"stat-content"}>{`Outlier Score: ${payload[0].value.toFixed(
                        2)}`}</span>
                    <span className={"stat-blurb"}>How strongly this voter's choices differed from the group</span>
                    <div className={"stat-spacer"}></div>
                    <span className={"stat-content"}>{`Disagreement Rate: ${(payload[1].value
                                                                             * 100).toFixed(0)
                        .toString().concat("%")}`}</span>
                    <span className={"stat-blurb"}>How often this voter was in the minority</span>
                </div>
            );
        }

        return null;
    };

    function voterOutlierChart() {
        const dataProcessed = voterOutlier(bracket, voters);
        const maxScore = (voters.length - 1) * totalMatches;
        const barSize = 55
        const barGap = 35
        const chartWidth = dataProcessed.length * (barSize + barGap) + 100;
        return (
            <BarChart
                data={dataProcessed}
                width={chartWidth}
                height={300}
            >
                <XAxis dataKey="name"/>
                <YAxis domain={[0, maxScore]}/>
                <Tooltip content={<OutlierTooltip/>} coordinate={{x: 600, y: 200}}/>
                <Bar dataKey="score" fill="#4d6ef3"
                     activeBar={<Rectangle fill="orange" stroke="gray"/>} barSize={40}/>
                <Bar dataKey="lossRate" fill="#3ea45e"
                     activeBar={<Rectangle fill="yellow" stroke="gray"/>} barSize={40}/>
            </BarChart>
        );
    }

    const voterSimilarityChart = (
        <span>Voter similarity chart</span>
    );

    // TODO; adjust the bar sizes more based on data length
    function getWinStrengthChart() {
        const dataProcessed = marginOfVictory(bracket);
        const dataLength = dataProcessed.length;
        const barSize = dataLength <= 16 ? 50 : 35;
        const barGap = dataLength <= 16 ? 30 : 15;
        const chartWidth = dataLength * (barSize + barGap) + 60;
        return (
            <BarChart
                data={dataProcessed}
                width={chartWidth}
                height={300}
            >
                <XAxis dataKey="name"/>
                <YAxis domain={[0, 1]}/>
                <Tooltip content={<WinStrengthTooltip/>}/>
                <Bar dataKey="percentage" fill="#8884d8"
                     activeBar={<Rectangle fill="pink" stroke="blue"/>} barSize={barSize}/>
            </BarChart>
        );
    }

    if (activeChart === 0) {
        return getWinStrengthChart();
    }
    if (activeChart === 1) {
        return voterOutlierChart();
    }
    if (activeChart === 2) {
        return voterSimilarityChart;
    }
}
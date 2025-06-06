import {Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {marginOfVictory} from "../BracketAlgos/PostGameStats.mjs";
import {animatedMovies, popArtists, testBracket1} from "../BracketAlgos/TestJSON.mjs";

export default function ChartContainer({activeChart, bracket}) {

    const CustomTooltip = ({active, payload, label}) => {
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

    const voterOutlierChart = (
        <span>Voter outlier chart</span>
    );

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
                <Tooltip viewBox={{width: 400, height: 100}}
                         content={<CustomTooltip/>}/>
                <Bar dataKey="percentage" fill="#8884d8"
                     activeBar={<Rectangle fill="pink" stroke="blue"/>} barSize={barSize}/>
            </BarChart>
        );
    }

    if (activeChart === 0) {
        return getWinStrengthChart();
    }
    if (activeChart === 1) {
        return voterOutlierChart;
    }
    if (activeChart === 2) {
        return voterSimilarityChart;
    }
}
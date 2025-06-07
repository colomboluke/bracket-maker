import React from 'react';
import "./Ideas.css"

export default function IdeasPage() {
    return (
        <div className={"ideas-cont"}>
            <h1>Bracket Maker Help</h1>
            <h2 className={"ideas-header"}>Overview</h2>
            <p className={"ideas-text"}>A Voting Bracket is my name for a game where one or multiple
                people simulate a March
                Madness style tournament for things other than sports teams. Like tier lists, you
                can make a bracket of anything you can think of - favorite songs, movies, fast food
                places, etc.
                They're usually single-elimination tournament style, so the highest seed plays the
                lowest seed, and the winners advance.</p>
            <p className={"ideas-text"}>At the end,
                the winner can be crowned 'The Group's Favorite Movie', for example. But don't worry
                too much about the ultimate winner - most
                of the fun is seeing what makes it far and getting unconventional matchups that you
                might not have thought of yourself. </p>
            <h2 className={"ideas-header"}>Seeding</h2>
            <p className={"ideas-text"}>Seeding can be done a number of ways. I
                recommend random, or using some external metric that you can easily look up—for
                example, number of streams on Spotify, a ranking from a magazine or blog, etc.</p>
            <h2 className={"ideas-header"}>Ideas</h2>
            <p className={"ideas-text"}>Need ideas? Below is a short list of some categories to help you brainstorm.</p>
            <ul>
                <li>Favorite animated movies</li>
                <li>Favorite action movies</li>
                <li>Best songs of all time</li>
                <li>Worst songs of all time</li>
                <li>Sports team logos</li>
                <li>Favorite animals</li>
                <li>Which animals would win in a fight</li>
                <li>Album covers</li>
                <li>TV show intros</li>
            </ul>
        </div>
    );
}

import Bracket from "./Bracket.mjs";

export const colorsBracketObject = {
    "roundID": 0,
    "matches": [
        {
            "id": 0,
            "winner": 1,
            "team1": {
                "id": 0,
                "position": 0,
                "name": "Red",
                "image": null
            },
            "team2": {
                "id": 7,
                "position": 7,
                "name": "Pink",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 1,
                "Maya": 2,
                "Coby": 1
            },
            "nextStatus": 0
        },
        {
            "id": 1,
            "winner": 1,
            "team1": {
                "id": 3,
                "position": 3,
                "name": "Green",
                "image": null
            },
            "team2": {
                "id": 4,
                "position": 4,
                "name": "Blue",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 2,
                "Maya": 1,
                "Coby": 1
            },
            "nextStatus": 1
        },
        {
            "id": 2,
            "winner": 2,
            "team1": {
                "id": 2,
                "position": 2,
                "name": "Yellow",
                "image": null
            },
            "team2": {
                "id": 5,
                "position": 5,
                "name": "Indigo",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 2,
                "Maya": 2,
                "Coby": 2
            },
            "nextStatus": 0
        },
        {
            "id": 3,
            "winner": 1,
            "team1": {
                "id": 1,
                "position": 1,
                "name": "Orange",
                "image": null
            },
            "team2": {
                "id": 6,
                "position": 6,
                "name": "Violet",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 2,
                "Maya": 1,
                "Coby": 1
            },
            "nextStatus": 1
        }
    ],
    "nextRound": {
        "roundID": 1,
        "matches": [
            {
                "id": 4,
                "winner": 2,
                "team1": {
                    "id": 0,
                    "position": 0,
                    "name": "Red",
                    "image": null
                },
                "team2": {
                    "id": 3,
                    "position": 3,
                    "name": "Green",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 2,
                    "Maya": 2,
                    "Coby": 1
                },
                "nextStatus": 0
            },
            {
                "id": 5,
                "winner": 2,
                "team1": {
                    "id": 5,
                    "position": 5,
                    "name": "Indigo",
                    "image": null
                },
                "team2": {
                    "id": 1,
                    "position": 1,
                    "name": "Orange",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 1,
                    "Maya": 2,
                    "Coby": 2
                },
                "nextStatus": 1
            }
        ],
        "nextRound": {
            "roundID": 2,
            "matches": [
                {
                    "id": 6,
                    "winner": 1,
                    "team1": {
                        "id": 3,
                        "position": 3,
                        "name": "Green",
                        "image": null
                    },
                    "team2": {
                        "id": 1,
                        "position": 1,
                        "name": "Orange",
                        "image": null
                    },
                    "nextMatchID": 7,
                    "votes": {
                        "Luke": 1,
                        "Maya": 1,
                        "Coby": 2
                    },
                    "nextStatus": 0
                }
            ],
            "nextRound": null
        }
    }
}

export const colorsBracket = new Bracket(colorsBracketObject.roundID, colorsBracketObject.matches, colorsBracketObject.nextRound);
console.log(colorsBracket, "\n\n", colorsBracketObject)
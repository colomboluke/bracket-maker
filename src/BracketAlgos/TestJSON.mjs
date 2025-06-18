import Bracket from "./Bracket.mjs";
export const testBracket1 = {
    "roundID": 0,
    "matches": [
        {
            "id": 0,
            "winner": 1,
            "team1": {
                "id": 0,
                "name": "Item 1",
                "image": null
            },
            "team2": {
                "id": 3,
                "name": "Item 4",
                "image": null
            },
            "nextMatchID": 2,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1
            },
            "nextStatus": 0
        },
        {
            "id": 1,
            "winner": 1,
            "team1": {
                "id": 1,
                "name": "Item 2",
                "image": null
            },
            "team2": {
                "id": 2,
                "name": "Item 3",
                "image": null
            },
            "nextMatchID": 2,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 1,
                "Voter 3": 1
            },
            "nextStatus": 1
        }
    ],
    "nextRound": {
        "roundID": 1,
        "matches": [
            {
                "id": 2,
                "winner": 1,
                "team1": {
                    "id": 0,
                    "name": "Item 1",
                    "image": null
                },
                "team2": {
                    "id": 1,
                    "name": "Item 2",
                    "image": null
                },
                "nextMatchID": 3,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 1,
                    "Voter 3": 2
                },
                "nextStatus": 0
            }
        ],
        "nextRound": null
    }
}

// export const testBracketActual = new Bracket(testBracket1.roundID, testBracket1.matches, testBracket1.nextRound)

export const animatedMovies = {
    "roundID": 0,
    "matches": [
        {
            "id": 0,
            "winner": 1,
            "team1": {
                "id": 0,
                "name": "Spiderverse",
                "image": null
            },
            "team2": {
                "id": 31,
                "name": "Megamind",
                "image": null
            },
            "nextMatchID": 16,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 1
            },
            "nextStatus": 0
        },
        {
            "id": 1,
            "winner": 1,
            "team1": {
                "id": 15,
                "name": "Coco",
                "image": null
            },
            "team2": {
                "id": 16,
                "name": "Little Mermaid",
                "image": null
            },
            "nextMatchID": 16,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 2
            },
            "nextStatus": 1
        },
        {
            "id": 2,
            "winner": 2,
            "team1": {
                "id": 8,
                "name": "Toy Story 1",
                "image": null
            },
            "team2": {
                "id": 23,
                "name": "Ratatouille",
                "image": null
            },
            "nextMatchID": 17,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 2,
                "Voter 3": 2,
                "Voter 4": 1,
                "Voter 5": 2
            },
            "nextStatus": 0
        },
        {
            "id": 3,
            "winner": 1,
            "team1": {
                "id": 7,
                "name": "Inside Out",
                "image": null
            },
            "team2": {
                "id": 24,
                "name": "Monsters Inc",
                "image": null
            },
            "nextMatchID": 17,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1,
                "Voter 4": 2,
                "Voter 5": 1
            },
            "nextStatus": 1
        },
        {
            "id": 4,
            "winner": 2,
            "team1": {
                "id": 4,
                "name": "Descpicable Me",
                "image": null
            },
            "team2": {
                "id": 27,
                "name": "Up",
                "image": null
            },
            "nextMatchID": 18,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 1,
                "Voter 3": 2,
                "Voter 4": 1,
                "Voter 5": 2
            },
            "nextStatus": 0
        },
        {
            "id": 5,
            "winner": 1,
            "team1": {
                "id": 11,
                "name": "How To Train Your Dragon 1",
                "image": null
            },
            "team2": {
                "id": 20,
                "name": "Finding Nemo",
                "image": null
            },
            "nextMatchID": 18,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1,
                "Voter 4": 2,
                "Voter 5": 2
            },
            "nextStatus": 1
        },
        {
            "id": 6,
            "winner": 2,
            "team1": {
                "id": 12,
                "name": "Rango",
                "image": null
            },
            "team2": {
                "id": 19,
                "name": "Lorax",
                "image": null
            },
            "nextMatchID": 19,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 2,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 2
            },
            "nextStatus": 0
        },
        {
            "id": 7,
            "winner": 1,
            "team1": {
                "id": 3,
                "name": "Moana",
                "image": null
            },
            "team2": {
                "id": 28,
                "name": "Storks",
                "image": null
            },
            "nextMatchID": 19,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 2,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 1
            },
            "nextStatus": 1
        },
        {
            "id": 8,
            "winner": 2,
            "team1": {
                "id": 2,
                "name": "Lego Movie",
                "image": null
            },
            "team2": {
                "id": 29,
                "name": "Wall-E",
                "image": null
            },
            "nextMatchID": 20,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 2,
                "Voter 3": 1,
                "Voter 4": 2,
                "Voter 5": 1
            },
            "nextStatus": 0
        },
        {
            "id": 9,
            "winner": 2,
            "team1": {
                "id": 13,
                "name": "Big Hero 6",
                "image": null
            },
            "team2": {
                "id": 18,
                "name": "Lion King",
                "image": null
            },
            "nextMatchID": 20,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 2,
                "Voter 3": 2,
                "Voter 4": 2,
                "Voter 5": 2
            },
            "nextStatus": 1
        },
        {
            "id": 10,
            "winner": 2,
            "team1": {
                "id": 10,
                "name": "Tangled",
                "image": null
            },
            "team2": {
                "id": 21,
                "name": "Howl's Moving Castle",
                "image": null
            },
            "nextMatchID": 21,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 1,
                "Voter 3": 2,
                "Voter 4": 2,
                "Voter 5": 1
            },
            "nextStatus": 0
        },
        {
            "id": 11,
            "winner": 2,
            "team1": {
                "id": 5,
                "name": "Madagascar",
                "image": null
            },
            "team2": {
                "id": 26,
                "name": "Spirited Away",
                "image": null
            },
            "nextMatchID": 21,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 2,
                "Voter 3": 1,
                "Voter 4": 2,
                "Voter 5": 2
            },
            "nextStatus": 1
        },
        {
            "id": 12,
            "winner": 1,
            "team1": {
                "id": 6,
                "name": "Incredibles 1",
                "image": null
            },
            "team2": {
                "id": 25,
                "name": "Shrek 2",
                "image": null
            },
            "nextMatchID": 22,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 1
            },
            "nextStatus": 0
        },
        {
            "id": 13,
            "winner": 2,
            "team1": {
                "id": 9,
                "name": "Lego Batman",
                "image": null
            },
            "team2": {
                "id": 22,
                "name": "Puss in Boots",
                "image": null
            },
            "nextMatchID": 22,
            "votes": {
                "Voter 1": 2,
                "Voter 2": 2,
                "Voter 3": 2,
                "Voter 4": 2,
                "Voter 5": 2
            },
            "nextStatus": 1
        },
        {
            "id": 14,
            "winner": 1,
            "team1": {
                "id": 14,
                "name": "Frozen",
                "image": null
            },
            "team2": {
                "id": 17,
                "name": "Hotel Transylvania",
                "image": null
            },
            "nextMatchID": 23,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 1,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 1
            },
            "nextStatus": 0
        },
        {
            "id": 15,
            "winner": 1,
            "team1": {
                "id": 1,
                "name": "Cars 1",
                "image": null
            },
            "team2": {
                "id": 30,
                "name": "Kung Fu Panda 1",
                "image": null
            },
            "nextMatchID": 23,
            "votes": {
                "Voter 1": 1,
                "Voter 2": 2,
                "Voter 3": 1,
                "Voter 4": 1,
                "Voter 5": 2
            },
            "nextStatus": 1
        }
    ],
    "nextRound": {
        "roundID": 1,
        "matches": [
            {
                "id": 16,
                "winner": 1,
                "team1": {
                    "id": 0,
                    "name": "Spiderverse",
                    "image": null
                },
                "team2": {
                    "id": 15,
                    "name": "Coco",
                    "image": null
                },
                "nextMatchID": 24,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 1,
                    "Voter 3": 1,
                    "Voter 4": 2,
                    "Voter 5": 2
                },
                "nextStatus": 0
            },
            {
                "id": 17,
                "winner": 2,
                "team1": {
                    "id": 23,
                    "name": "Ratatouille",
                    "image": null
                },
                "team2": {
                    "id": 7,
                    "name": "Inside Out",
                    "image": null
                },
                "nextMatchID": 24,
                "votes": {
                    "Voter 1": 2,
                    "Voter 2": 1,
                    "Voter 3": 2,
                    "Voter 4": 2,
                    "Voter 5": 1
                },
                "nextStatus": 1
            },
            {
                "id": 18,
                "winner": 1,
                "team1": {
                    "id": 27,
                    "name": "Up",
                    "image": null
                },
                "team2": {
                    "id": 11,
                    "name": "How To Train Your Dragon 1",
                    "image": null
                },
                "nextMatchID": 25,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 2,
                    "Voter 3": 2,
                    "Voter 4": 1,
                    "Voter 5": 1
                },
                "nextStatus": 0
            },
            {
                "id": 19,
                "winner": 2,
                "team1": {
                    "id": 19,
                    "name": "Lorax",
                    "image": null
                },
                "team2": {
                    "id": 3,
                    "name": "Moana",
                    "image": null
                },
                "nextMatchID": 25,
                "votes": {
                    "Voter 1": 2,
                    "Voter 2": 1,
                    "Voter 3": 2,
                    "Voter 4": 2,
                    "Voter 5": 2
                },
                "nextStatus": 1
            },
            {
                "id": 20,
                "winner": 2,
                "team1": {
                    "id": 29,
                    "name": "Wall-E",
                    "image": null
                },
                "team2": {
                    "id": 18,
                    "name": "Lion King",
                    "image": null
                },
                "nextMatchID": 26,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 1,
                    "Voter 3": 2,
                    "Voter 4": 2,
                    "Voter 5": 2
                },
                "nextStatus": 0
            },
            {
                "id": 21,
                "winner": 1,
                "team1": {
                    "id": 21,
                    "name": "Howl's Moving Castle",
                    "image": null
                },
                "team2": {
                    "id": 26,
                    "name": "Spirited Away",
                    "image": null
                },
                "nextMatchID": 26,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 1,
                    "Voter 3": 1,
                    "Voter 4": 2,
                    "Voter 5": 2
                },
                "nextStatus": 1
            },
            {
                "id": 22,
                "winner": 2,
                "team1": {
                    "id": 6,
                    "name": "Incredibles 1",
                    "image": null
                },
                "team2": {
                    "id": 22,
                    "name": "Puss in Boots",
                    "image": null
                },
                "nextMatchID": 27,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 2,
                    "Voter 3": 2,
                    "Voter 4": 2,
                    "Voter 5": 2
                },
                "nextStatus": 0
            },
            {
                "id": 23,
                "winner": 2,
                "team1": {
                    "id": 14,
                    "name": "Frozen",
                    "image": null
                },
                "team2": {
                    "id": 1,
                    "name": "Cars 1",
                    "image": null
                },
                "nextMatchID": 27,
                "votes": {
                    "Voter 1": 1,
                    "Voter 2": 1,
                    "Voter 3": 2,
                    "Voter 4": 2,
                    "Voter 5": 2
                },
                "nextStatus": 1
            }
        ],
        "nextRound": {
            "roundID": 2,
            "matches": [
                {
                    "id": 24,
                    "winner": 1,
                    "team1": {
                        "id": 0,
                        "name": "Spiderverse",
                        "image": null
                    },
                    "team2": {
                        "id": 7,
                        "name": "Inside Out",
                        "image": null
                    },
                    "nextMatchID": 28,
                    "votes": {
                        "Voter 1": 1,
                        "Voter 2": 1,
                        "Voter 3": 1,
                        "Voter 4": 2,
                        "Voter 5": 2
                    },
                    "nextStatus": 0
                },
                {
                    "id": 25,
                    "winner": 2,
                    "team1": {
                        "id": 27,
                        "name": "Up",
                        "image": null
                    },
                    "team2": {
                        "id": 3,
                        "name": "Moana",
                        "image": null
                    },
                    "nextMatchID": 28,
                    "votes": {
                        "Voter 1": 2,
                        "Voter 2": 2,
                        "Voter 3": 1,
                        "Voter 4": 2,
                        "Voter 5": 2
                    },
                    "nextStatus": 1
                },
                {
                    "id": 26,
                    "winner": 1,
                    "team1": {
                        "id": 18,
                        "name": "Lion King",
                        "image": null
                    },
                    "team2": {
                        "id": 21,
                        "name": "Howl's Moving Castle",
                        "image": null
                    },
                    "nextMatchID": 29,
                    "votes": {
                        "Voter 1": 1,
                        "Voter 2": 1,
                        "Voter 3": 2,
                        "Voter 4": 1,
                        "Voter 5": 2
                    },
                    "nextStatus": 0
                },
                {
                    "id": 27,
                    "winner": 2,
                    "team1": {
                        "id": 22,
                        "name": "Puss in Boots",
                        "image": null
                    },
                    "team2": {
                        "id": 1,
                        "name": "Cars 1",
                        "image": null
                    },
                    "nextMatchID": 29,
                    "votes": {
                        "Voter 1": 1,
                        "Voter 2": 2,
                        "Voter 3": 2,
                        "Voter 4": 2,
                        "Voter 5": 1
                    },
                    "nextStatus": 1
                }
            ],
            "nextRound": {
                "roundID": 3,
                "matches": [
                    {
                        "id": 28,
                        "winner": 1,
                        "team1": {
                            "id": 0,
                            "name": "Spiderverse",
                            "image": null
                        },
                        "team2": {
                            "id": 3,
                            "name": "Moana",
                            "image": null
                        },
                        "nextMatchID": 30,
                        "votes": {
                            "Voter 1": 2,
                            "Voter 2": 1,
                            "Voter 3": 1,
                            "Voter 4": 1,
                            "Voter 5": 2
                        },
                        "nextStatus": 0
                    },
                    {
                        "id": 29,
                        "winner": 1,
                        "team1": {
                            "id": 18,
                            "name": "Lion King",
                            "image": null
                        },
                        "team2": {
                            "id": 1,
                            "name": "Cars 1",
                            "image": null
                        },
                        "nextMatchID": 30,
                        "votes": {
                            "Voter 1": 1,
                            "Voter 2": 1,
                            "Voter 3": 1,
                            "Voter 4": 2,
                            "Voter 5": 2
                        },
                        "nextStatus": 1
                    }
                ],
                "nextRound": {
                    "roundID": 4,
                    "matches": [
                        {
                            "id": 30,
                            "winner": 1,
                            "team1": {
                                "id": 0,
                                "name": "Spiderverse",
                                "image": null
                            },
                            "team2": {
                                "id": 18,
                                "name": "Lion King",
                                "image": null
                            },
                            "nextMatchID": 31,
                            "votes": {
                                "Voter 1": 1,
                                "Voter 2": 1,
                                "Voter 3": 1,
                                "Voter 4": 2,
                                "Voter 5": 2
                            },
                            "nextStatus": 0
                        }
                    ],
                    "nextRound": null
                }
            }
        }
    }
}

export const popArtists = {
    "roundID": 0,
    "matches": [
        {
            "id": 0,
            "winner": 1,
            "team1": {
                "id": 0,
                "name": "Dua Lipa",
                "image": null
            },
            "team2": {
                "id": 7,
                "name": "Taylor Swift",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 2,
                "Jake": 1,
                "Aidan": 1
            },
            "nextStatus": 0
        },
        {
            "id": 1,
            "winner": 2,
            "team1": {
                "id": 3,
                "name": "Ariana Grande",
                "image": null
            },
            "team2": {
                "id": 4,
                "name": "Katy Perry",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 2,
                "Jake": 2,
                "Aidan": 1
            },
            "nextStatus": 1
        },
        {
            "id": 2,
            "winner": 2,
            "team1": {
                "id": 2,
                "name": "Beyonce",
                "image": null
            },
            "team2": {
                "id": 5,
                "name": "Rihanna",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 1,
                "Jake": 2,
                "Aidan": 2
            },
            "nextStatus": 0
        },
        {
            "id": 3,
            "winner": 1,
            "team1": {
                "id": 1,
                "name": "Adele",
                "image": null
            },
            "team2": {
                "id": 6,
                "name": "Olivia Rodrigo",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 1,
                "Jake": 1,
                "Aidan": 1
            },
            "nextStatus": 1
        }
    ],
    "nextRound": {
        "roundID": 1,
        "matches": [
            {
                "id": 4,
                "winner": 1,
                "team1": {
                    "id": 0,
                    "name": "Dua Lipa",
                    "image": null
                },
                "team2": {
                    "id": 4,
                    "name": "Katy Perry",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 2,
                    "Jake": 1,
                    "Aidan": 1
                },
                "nextStatus": 0
            },
            {
                "id": 5,
                "winner": 1,
                "team1": {
                    "id": 5,
                    "name": "Rihanna",
                    "image": null
                },
                "team2": {
                    "id": 1,
                    "name": "Adele",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 2,
                    "Jake": 1,
                    "Aidan": 1
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
                        "id": 0,
                        "name": "Dua Lipa",
                        "image": null
                    },
                    "team2": {
                        "id": 5,
                        "name": "Rihanna",
                        "image": null
                    },
                    "nextMatchID": 7,
                    "votes": {
                        "Luke": 2,
                        "Jake": 1,
                        "Aidan": 1
                    },
                    "nextStatus": 0
                }
            ],
            "nextRound": null
        }
    }
}

export const voters = [
    {
        "name": "Luke"
    },
    {
        "name": "Jake"
    },
    {
        "name": "Aidan"
    }
]

export const sevenVotersBracket = {
    "roundID": 0,
    "matches": [
        {
            "id": 0,
            "winner": 1,
            "team1": {
                "id": 0,
                "name": "Spiderverse 1",
                "image": null
            },
            "team2": {
                "id": 7,
                "name": "Storks",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 1,
                "Jake": 1,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 1,
                "Ivan": 2,
                "Connor": 1
            },
            "nextStatus": 0
        },
        {
            "id": 1,
            "winner": 1,
            "team1": {
                "id": 3,
                "name": "Cars",
                "image": null
            },
            "team2": {
                "id": 4,
                "name": "Shrek",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 2,
                "Jake": 2,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 2,
                "Ivan": 1,
                "Connor": 1
            },
            "nextStatus": 1
        },
        {
            "id": 2,
            "winner": 1,
            "team1": {
                "id": 2,
                "name": "Moana",
                "image": null
            },
            "team2": {
                "id": 5,
                "name": "Spirited Away",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 2,
                "Jake": 2,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 2,
                "Ivan": 1,
                "Connor": 1
            },
            "nextStatus": 0
        },
        {
            "id": 3,
            "winner": 1,
            "team1": {
                "id": 1,
                "name": "Puss in Boots 2",
                "image": null
            },
            "team2": {
                "id": 6,
                "name": "Frozen",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 1,
                "Jake": 1,
                "Aidan": 1,
                "Zach": 2,
                "Gabe": 1,
                "Ivan": 2,
                "Connor": 2
            },
            "nextStatus": 1
        }
    ],
    "nextRound": {
        "roundID": 1,
        "matches": [
            {
                "id": 4,
                "winner": 1,
                "team1": {
                    "id": 0,
                    "name": "Spiderverse 1",
                    "image": null
                },
                "team2": {
                    "id": 3,
                    "name": "Cars",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 1,
                    "Jake": 1,
                    "Aidan": 1,
                    "Zach": 2,
                    "Gabe": 1,
                    "Ivan": 1,
                    "Connor": 2
                },
                "nextStatus": 0
            },
            {
                "id": 5,
                "winner": 1,
                "team1": {
                    "id": 2,
                    "name": "Moana",
                    "image": null
                },
                "team2": {
                    "id": 1,
                    "name": "Puss in Boots 2",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 1,
                    "Jake": 2,
                    "Aidan": 2,
                    "Zach": 1,
                    "Gabe": 2,
                    "Ivan": 1,
                    "Connor": 1
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
                        "id": 0,
                        "name": "Spiderverse 1",
                        "image": null
                    },
                    "team2": {
                        "id": 2,
                        "name": "Moana",
                        "image": null
                    },
                    "nextMatchID": 7,
                    "votes": {
                        "Luke": 1,
                        "Jake": 1,
                        "Aidan": 1,
                        "Zach": 2,
                        "Gabe": 1,
                        "Ivan": 1,
                        "Connor": 1
                    },
                    "nextStatus": 0
                }
            ],
            "nextRound": null
        }
    }
}

export const fiveVoters = [
    {
        "name": "Luke"
    },
    {
        "name": "Jake"
    },
    {
        "name": "Aidan"
    },
    {
        "name": "Zach"
    },
    {
        "name": "Gabe"
    }
]

export const videoGames = {
    "roundID": 0,
    "matches": [
        {
            "id": 0,
            "winner": 1,
            "team1": {
                "id": 0,
                "name": "Minecraft",
                "image": null
            },
            "team2": {
                "id": 7,
                "name": "Zelda",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 1,
                "Jake": 1,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 2
            },
            "nextStatus": 0
        },
        {
            "id": 1,
            "winner": 1,
            "team1": {
                "id": 3,
                "name": "Super Smash Bros",
                "image": null
            },
            "team2": {
                "id": 4,
                "name": "Fornite",
                "image": null
            },
            "nextMatchID": 4,
            "votes": {
                "Luke": 2,
                "Jake": 2,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 1
            },
            "nextStatus": 1
        },
        {
            "id": 2,
            "winner": 1,
            "team1": {
                "id": 2,
                "name": "Mario Kart",
                "image": null
            },
            "team2": {
                "id": 5,
                "name": "Valorant",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 2,
                "Jake": 2,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 1
            },
            "nextStatus": 0
        },
        {
            "id": 3,
            "winner": 1,
            "team1": {
                "id": 1,
                "name": "Overwatch",
                "image": null
            },
            "team2": {
                "id": 6,
                "name": "Civ 6",
                "image": null
            },
            "nextMatchID": 5,
            "votes": {
                "Luke": 2,
                "Jake": 1,
                "Aidan": 1,
                "Zach": 1,
                "Gabe": 2
            },
            "nextStatus": 1
        }
    ],
    "nextRound": {
        "roundID": 1,
        "matches": [
            {
                "id": 4,
                "winner": 1,
                "team1": {
                    "id": 0,
                    "name": "Minecraft",
                    "image": null
                },
                "team2": {
                    "id": 3,
                    "name": "Super Smash Bros",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 1,
                    "Jake": 1,
                    "Aidan": 2,
                    "Zach": 2,
                    "Gabe": 1
                },
                "nextStatus": 0
            },
            {
                "id": 5,
                "winner": 1,
                "team1": {
                    "id": 2,
                    "name": "Mario Kart",
                    "image": null
                },
                "team2": {
                    "id": 1,
                    "name": "Overwatch",
                    "image": null
                },
                "nextMatchID": 6,
                "votes": {
                    "Luke": 1,
                    "Jake": 2,
                    "Aidan": 2,
                    "Zach": 1,
                    "Gabe": 1
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
                        "id": 0,
                        "name": "Minecraft",
                        "image": null
                    },
                    "team2": {
                        "id": 2,
                        "name": "Mario Kart",
                        "image": null
                    },
                    "nextMatchID": 7,
                    "votes": {
                        "Luke": 1,
                        "Jake": 1,
                        "Aidan": 1,
                        "Zach": 1,
                        "Gabe": 1
                    },
                    "nextStatus": 0
                }
            ],
            "nextRound": null
        }
    }
}
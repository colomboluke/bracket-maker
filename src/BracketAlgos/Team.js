/**
 * A single team.
 * ID is just a unique identifier
 * Position corresponds to its index in the `teams` array
 */
// Note to self: calling any function that relies on the team's position in the array
// (array index) should be called with team.position. Anything that relies on bracket functions
// like getTeam should be called with team.id
export default class Team {
    constructor(id, name, position) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.image = null;
    }
    setImage(image) {
        this.image = image;
    }
}
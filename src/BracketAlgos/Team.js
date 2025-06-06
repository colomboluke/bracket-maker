/**
 * A single team.
 * Unique ID acts as its seed
 */
export default class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.image = null;
    }
    setImage(image) {
        this.image = image;
    }
}
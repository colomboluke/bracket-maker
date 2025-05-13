//Gets the property of the object unless object is null, in which case it returns null
// Also formats the seed to add a period at the end
export function matchupSafeGet(object, property) {
    if (object !== null && object !== undefined) {
        if (property === "id") {
            return object[property] + 1 + ".";
        }
        return object[property];
    }
    return "";
}
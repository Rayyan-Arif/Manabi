export const wait = sec => new Promsie(resolve => setTimeout(resolve, sec * 1000));
export const capitalize = word => word.split(" ").map(w => w[0].toUpperCase() + w.toLowerCase().slice(1)).join(" ");
export const generateRelativeTimestamp = (time) => {

    if (time < 1)
        return `Today`;

    if (time < 7)
        return `${time} days`;

    if (time < 30) {
        time = Math.floor(time/7);
        return `${time} weeks`;
    }
    if (time < 365) {
        time = Math.floor(time/30);
        return `${time} months`;
    } 
    time = Math.floor(time/365);
    return `${time} years`;
}
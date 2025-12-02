export default class Day {
    constructor(timestamp, map) {
        this.date = new Date(timestamp);
        if (map) {
            this.coursesStudied = map;
        }
        if (!map) {
            this.coursesStudied = new Map([
                ["Programming", 20],
                ["Math", 100]
            ]); // HARDCODED
        }
    }
}
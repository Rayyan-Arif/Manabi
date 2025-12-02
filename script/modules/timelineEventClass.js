export default class TimelineEvent {
    constructor(title, timestamp = Date.now()) {
        this.title = title;
        this.timestamp = timestamp;
    }
};
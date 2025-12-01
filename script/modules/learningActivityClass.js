export default class LearningActivity {
    constructor(course_name, timestamp = Date.now(), completed = false) {
        this.course_name = course_name;
        this.timestamp = timestamp;
        this.completed = completed;
    }
};
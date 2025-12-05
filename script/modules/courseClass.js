class Course {
    constructor(id, title, category, difficulty, style, description, icon) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.difficulty = difficulty;
        this.style = style;
        this.description = description;
        this.icon = icon;
        this.tags = [];
        // this.instructor = instructor;
    }
};

export default Course;
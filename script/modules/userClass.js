class User {

    constructor(name, degree, institute, country, about) {
        this.name = name;
        this.degree = degree;
        this.institute = institute;
        this.country = country;
        this.about = about

        this.registeredYear = new Date();
        this.level = 0;
        this.learning_minutes = 0;
        this.experience_points = 0;   
        this.learningStrengths = [];
    }

    getTopSkill() {
        return null;
    }
    getGoalCompletionRate() {
        return null;
    }
    getPeakActivityRate() {
        return null;
    }
};

export default User;
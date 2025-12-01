import LearningActivity from "./learningActivityClass.js";

const DAY = 86_400_000;

class User {

    constructor(name, degree, institute, country, about, goal) {
        this.name = name;
        this.degree = degree;
        this.institute = institute;
        this.country = country;
        this.about = about
        this.goal = goal; // minutes

        this.level = 1;
        this.learning_minutes = 200;
        this.experience_points = 1400;
        this.learning_strengths = ["Fast pattern recognition", 
                                   "Visual Learner", 
                                   "Hard-working", 
                                   "Strong problem-solving"
        ];    // HARD CODED
        this.registered_year = new Date();
        this.activity = [230, 500, 105]; // HARD CODED
        this.streak = 3;
        this.timeline = [
            new LearningActivity("Photosynthesis — Animation Lesson", Date.now()-2*DAY),
            new LearningActivity("Fractions — Visual Guide", Date.now()-14*DAY, true)
        ];
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
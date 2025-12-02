import Day from "./dayClass.js";
import Achievement from "./achievementClass.js";
import weekDay from "./weekDayObject.js";
import TimelineEvent from "./timelineEventClass.js";

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
        this.learning_style = "Logical"
        this.learning_minutes = 200;
        this.experience_points = 1400;
        this.learning_strengths = ["Fast pattern recognition", 
                                   "Visual Learner", 
                                   "Hard-working", 
                                   "Strong problem-solving"
        ];    // HARD CODED
        this.registered_year = new Date();

        // Time spent: Date, Map: subject -> time (in minutes) 

        this.time_spent = [
            new Day(Date.now()-DAY, new Map([
                ["Programming", 100],
                ["Mathematics", 200],
            ])), 
            new Day(Date.now()-2*DAY, new Map([
                ["Programming", 1500],
                ["Mathematics", 80],
            ])), 
            new Day(Date.now()-3*DAY, new Map([
                ["Programming", 100],
                ["Mathematics", 50],
            ]))
        ]; // HARD CODED

        this.streak = 3;
        this.timeline = [
            new TimelineEvent(`▶️ "Started Photosynthesis — Animation Lesson"`, Date.now()-2*DAY),
            new TimelineEvent(`✅ "Completed Fractions — Visual Guide"`, Date.now()-14*DAY, true)
        ];
        this.milestones = [
            new TimelineEvent("🚀 Achieved 100 Learning Minutes", Date.now()-28*DAY),
            new TimelineEvent("✨ Unlocked 6 Badges", Date.now()-14*DAY),
            new TimelineEvent("🏅 Reached Level 5 Status", Date.now()-21*DAY),
        ];
        this.achievements = [
            new Achievement("Goal Achiever", "Completed 20 daily goals"),
            new Achievement("Level 5 Learner", "Steady and consistent growth"),
            new Achievement("Visual Master", "Excellence in visual learning")
        ];

    }

    getTopSkill() {
        const mp = new Map();
        this.time_spent.forEach(day => {
            day.coursesStudied.entries().forEach(([skill, time]) => {
                if (mp.has(skill)) {
                    mp.set(skill, mp.get(skill)+time);
                } else {
                    mp.set(skill, time);
                }
            });
        });

        const {topSkill} = mp.entries().reduce(({topSkill, currentSkillTime}, [skill, time]) => {
            if (time > currentSkillTime) {
                topSkill = skill,
                currentSkillTime = time
            }
            return {topSkill, currentSkillTime};
        }, {
            topSkill: null,
            currentSkillTime: Number.MIN_SAFE_INTEGER
        });
        return topSkill;
    }
    getGoalCompletionRate() {
        let avg = 0;
        this.time_spent.forEach(day => {
            const todays_time = day.coursesStudied.values().reduce((sum, curr) => sum + curr, 0);
            avg += Math.min(1, Math.ceil(todays_time/this.goal)) * 100;
        });
        avg = Math.ceil(avg / this.time_spent.length);
        return avg;
    }
    getPeakActivityRate() {
        const mp = new Map();
        const {day} = this.time_spent.reduce((peakDay, day) => {
            const day_name = weekDay[day.date.getDay()];
            const curr_day_time = day.coursesStudied.values().reduce((sum, curr) => sum + curr, 0);
            if (mp.has(day_name)) {
                mp.set(day_name, mp.get(day_name) + curr_day_time);
            } else {
                mp.set(day_name, curr_day_time);
            }
            if (peakDay.time < mp.get(day_name)) {
                peakDay = {
                    day: day_name,
                    time: mp.get(day_name)
                }
            }
            return peakDay;
        }, {
            day: null,
            time: Number.MIN_SAFE_INTEGER
        });
        return day;
    }
};

export default User;
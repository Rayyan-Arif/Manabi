import User from "../modules/userClass.js";
import {wait, capitalize, generateRelativeTimestamp} from "../modules/helpers.js";

const DAY = 86_400_000;
const user = new User("Abdul Rauf", "BS Computer Science", "GIKI", "Pakistan", "Passionate Computer Scientist, Web Developer, Competitive Programmer", 120);
const themeBtn = document.querySelector(".btn-icon");
const sidebar_container = document.querySelector(".sidebar-nav");
// ==================== NAVIGATION ====================

sidebar_container.addEventListener("click", (e) => switchToSection(e.target.closest(".sidebar-nav-item")));

function loadOverview() {
    generateHeatmap();
    animateChartBars();
    setTimeout(animateStats, 300);   
}

function loadProfile() {
    document.querySelector(".user-name").textContent = capitalize(user.name);
    document.querySelector(".user-institute").textContent = `${user.degree} - ${user.institute}, ${user.country}`;
    document.querySelector(".user-level").textContent = `Level ${user.level} Learner • Active since ${user.registered_year.getFullYear()}`;

    const learning_strengths_tags_container = document.querySelector(".tags-list");
    const timeline_container = document.querySelector(".timeline");

    learning_strengths_tags_container.innerHTML = "";
    timeline_container.innerHTML = ""; 

    if (!user.learning_strengths.length)
        learning_strengths_tags_container.closest(".card").classList.add("hidden");


    user.learning_strengths.forEach(strength =>
        learning_strengths_tags_container.insertAdjacentHTML("beforeend", `<span class="tag">${strength}</span>`)
    );

    document.querySelector(".user-about-me").textContent = user.about;


    user.timeline.forEach(activity => {
        const time = Math.floor((Date.now()-activity.timestamp)/DAY);
        const html = `
            <div class="timeline-item">
                <div class="timeline-title">${activity.title}</div>
                <div class="timeline-time">${generateRelativeTimestamp(time)} ago</div>
            </div>`;
        timeline_container.insertAdjacentHTML("beforeend", html);
    });
}

function openEditForm() {
    const modal_container = document.getElementById("editProfileModal"); 
    const modal_name = document.getElementById("modalName");
    const modal_about = document.getElementById("modalAbout");
    const modal_goal = document.getElementById("modalGoal");
    
    modal_container.classList.remove("hidden");
    modal_name.value = user.name;
    modal_about.value = user.about;
    modal_goal.value = user.goal;
    modal_name.focus();
}

function closeEditForm() {document.getElementById("editProfileModal").classList.add("hidden")}

function submitEditForm(e) {
    e.preventDefault();

    const modal_name = document.getElementById("modalName");
    const modal_about = document.getElementById("modalAbout");
    const modal_goal = document.getElementById("modalGoal");
    
    user.name = modal_name.value || user.name;
    user.about = modal_about.value || user.about;
    user.goal = +modal_goal.value;    
    closeEditForm();
    loadProfile();
}

function loadAchievements() {

    const achievementsGrid = document.querySelector(".badges-grid");
    const milestoneJourneyElement = document.querySelector(".achievements-milestones");

    achievementsGrid.innerHTML = "";
    milestoneJourneyElement.innerHTML = "";

    user.achievements.forEach(achievement => {
        achievementsGrid.insertAdjacentHTML("beforeend", `
            <div class="badge-card">
                <div class="badge-icon">🏆</div>
                <div class="badge-name">${achievement.title}</div>
                <div class="badge-desc">${achievement.description}</div>
            </div>
        `);
    });

    document.querySelector(".stat-badges-count").textContent = user.achievements.length;
    document.querySelector(".stat-top-skill").textContent = user.getTopSkill();
    document.querySelector(".stat-goal-completion-rate").innerHTML = `${user.getGoalCompletionRate()}&#65285;`;
    document.querySelector(".stat-most-active-day").textContent = user.getPeakActivityRate();

    user.milestones.sort((a, b) => b.timestamp-a.timestamp);

    user.milestones.forEach(milestone => {
        const time = Math.floor((Date.now()-milestone.timestamp)/DAY);        
        milestoneJourneyElement.insertAdjacentHTML("beforeend", `
            <div class="timeline-item">
                <div class="timeline-title">${milestone.title}</div>
                <div class="timeline-time">${generateRelativeTimestamp(time)}</div>
            </div>
        `);
    });
}

function animateChartBars() {

    const timePerDay = user.time_spent.map(day =>
        day.coursesStudied.values().reduce((sum, curr) => sum + curr, 0));

    // set 100 to 0 in production
    const chartData = [100,100,100,100,100,100,100, ...timePerDay].slice(-7);

    const bars = document.querySelectorAll(".chart-bar");
    const max = Math.max(...chartData);

    bars.forEach((bar, index) => {
        if (chartData[index] === 0) 
            return;
        setTimeout(() => {
            bar.style.height = (chartData[index] / max) * 100 + "px";
        }, 100 + index * 80);
    });
}

function animateStats() {

    const stats = [
        { id: "overview-streak", value: user.streak },
        { id: "overview-time", value: user.learning_minutes },
        { id: "overview-xp", value: user.experience_points },
    ];

    stats.forEach((stat) => {
        const element = document.getElementById(stat.id);
        if (!element) return;
        let current = 0;
        const increment = stat.value / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
                element.textContent = stat.value;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    });

    const overview_learning_style = document.getElementById("overview-style");
    const learningStyle = user.learning_style;
    overview_learning_style.textContent = learningStyle[0];

    let charIndex = 1;
    const charInterval = setInterval(() => {
        if (charIndex < learningStyle.length) {
            overview_learning_style.textContent += learningStyle[charIndex];
            charIndex++;
        } else {
            clearInterval(charInterval);
        }
    }, 60);
}

function generateHeatmap() {
    const heatmap = document.getElementById("heatmap");
    heatmap.innerHTML = "";
  
    const timePerDay = user.time_spent.map(
          day => day.coursesStudied.values().reduce((sum, curr) => sum + curr, 0));
  
    const levels = [...Array(30).fill(0), ...timePerDay].slice(-30);  
  
    levels.forEach((level, index) => {      
      level = Math.min(5, Math.ceil(level/5));
        
      const cell = document.createElement("div");
      cell.className = `heatmap-cell level-${level}`;
      cell.title = `Day ${index + 1}: ${level * 20}% active`;
      cell.style.animation = `fadeIn 0.3s ease ${index * 30}ms forwards`;
      cell.style.opacity = "0";
      heatmap.appendChild(cell);
    });
}

function switchToSection(newSection) {

    const section_titles = {
        overview: "📊 Dashboard Overview",
        profile: "👤 My Profile",
        progress: "📈 Learning Progress",
        achievements: "🏆 Achievements",
    };  

    sidebar_container.querySelectorAll(".sidebar-nav-item").forEach((child) => {
        child.querySelector(".sidebar-nav-link").classList.remove("active");
    });

    const link = newSection.querySelector(".sidebar-nav-link");
    const section_name = link.dataset.section;

    link.classList.add("active");
    document.getElementById("pageTitle").textContent = section_titles[section_name];
    document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
    document.getElementById(`section-${section_name}`).classList.add("active");

    switch (section_name) {
        case "overview":
            loadOverview();
            break;
        case "profile":
            loadProfile();
            break;
        case "achievements":
            loadAchievements();
            break;
        default: 
            break;
    }
}


// ==================== THEME TOGGLE ====================

themeBtn.addEventListener("click", () => {
    const htmlElement = document.documentElement;  
    htmlElement.classList.toggle("dark-mode");
    themeBtn.textContent = htmlElement.classList.contains("dark-mode") ? "☀️" : "🌙";
});


switchToSection(document.querySelector(".nav-item-overview"));


document.querySelector(".btn-modal-submit").addEventListener("click", submitEditForm);
document.querySelector(".btn-modal-cancel").addEventListener("click", closeEditForm);
document.getElementById("closeModalBtn").addEventListener("click", closeEditForm);
document.getElementById("editProfileBtn").addEventListener("click", openEditForm);
document.querySelector(".profile-avatar").addEventListener("click", switchToSection.bind(null, document.querySelector(".nav-item-profile")));

console.log("✨ Manabi Combined Dashboard loaded successfully!");
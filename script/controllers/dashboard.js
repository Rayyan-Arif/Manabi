import User from "../modules/userClass.js";
import {wait, capitalize, generateRelativeTimestamp} from "../modules/helpers.js";

const DAY = 86_400_000;

const user = new User("Abdul Rauf", "BS Computer Science", "GIKI", "Pakistan", "Passionate Computer Scientist, Web Developer, Competitive Programmer");

const sidebarContainer = document.querySelector(".sidebar-nav");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("pageTitle");

const sectionTitles = {
  overview: "📊 Dashboard Overview",
  profile: "👤 My Profile",
  progress: "📈 Learning Progress",
  achievements: "🏆 Achievements",
};

// ==================== NAVIGATION ====================

sidebarContainer.addEventListener("click", (e) => {
    const parnet_nav_section = e.target.closest(".sidebar-nav-item");
    sidebarContainer.querySelectorAll(".sidebar-nav-item").forEach((child) => {
        child.querySelector(".sidebar-nav-link").classList.remove("active");
    });
    const link = parnet_nav_section.querySelector(".sidebar-nav-link");
    const section_name = link.dataset.section;

    link.classList.add("active");
    pageTitle.textContent = sectionTitles[section_name];

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
});


function loadOverview() {

}

function loadProfile() {
    document.querySelector(".user-name").textContent = capitalize(user.name);
    document.querySelector(".user-institute").textContent = `${user.degree} - ${user.institute}, ${user.country}`;
    document.querySelector(".user-level").textContent = `Level ${user.level} Learner • Active since ${user.registered_year.getFullYear()}`;

    const learningStrengthsTagsContainer = document.querySelector(".tags-list");
    const timelineContainer = document.querySelector(".timeline");

    learningStrengthsTagsContainer.innerHTML = "";
    timelineContainer.innerHTML = ""; 

    if (!user.learning_strengths.length)
        learningStrengthsTagsContainer.closest(".card").classList.add("hidden");


    user.learning_strengths.forEach(strength =>
        learningStrengthsTagsContainer.insertAdjacentHTML("beforeend", `<span class="tag">${strength}</span>`)
    );

    document.querySelector(".user-about-me").textContent = user.about;


    user.timeline.forEach(activity => {
        const time = Math.floor((Date.now()-activity.timestamp)/DAY);
        const html = `
            <div class="timeline-item">
                <div class="timeline-title">
                    ${activity.completed ? "✅ Completed" : "▶️ Started"} "${activity.course_name}"
                </div>
                <div class="timeline-time">${generateRelativeTimestamp(time)} ago</div>
            </div>`;
        timelineContainer.insertAdjacentHTML("beforeend", html);
    });
}

function loadAchievements() {

}


// ==================== ANIMATE CHART BARS ====================
function animateChartBars() {

    // set 100 to 0 in production
    const chartData = [100,100,100,100,100,100,100, ...user.activity].slice(-7);

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

// ==================== GENERATE HEATMAP ====================
function generateHeatmap() {
  const heatmap = document.getElementById("heatmap");
  heatmap.innerHTML = "";

  const levels = [...Array(30).fill(0), ...user.activity].slice(-30);  

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

// ==================== ANIMATE STATS ON LOAD ====================
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
}


// ==================== THEME TOGGLE ====================
const themeBtn = document.querySelector(".btn-icon");
let isDark = false;

themeBtn.addEventListener("click", () => {
  isDark = !isDark;
  document.body.style.filter = isDark ? "invert(0.9)" : "invert(0)";
  themeBtn.textContent = isDark ? "☀️" : "🌙";
});

// ==================== RESPONSIVE SIDEBAR TOGGLE ====================
if (window.innerWidth <= 768) {
  const sidebar = document.querySelector(".sidebar");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // On mobile, sidebar scrolls back to show content
      document.querySelector(".content").scrollTop = 0;
    });
  });
}

// ==================== SMOOTH SCROLL ====================
document.documentElement.style.scrollBehavior = "smooth";

// Only for testing:
loadProfile();


// init
generateHeatmap();
animateChartBars();
setTimeout(animateStats, 300);

console.log("✨ Manabi Combined Dashboard loaded successfully!");
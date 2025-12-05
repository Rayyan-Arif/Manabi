import Course from "./script/modules/courseClass.js";
// Note: Import will be used later when needed

// ==================== NIGHT MODE FUNCTIONALITY ====================

// Initialize theme immediately on page load (before rendering)
function initializeTheme() {
  const savedTheme = localStorage.getItem("courseLibraryTheme");
  const htmlElement = document.documentElement;

  if (savedTheme === "dark") {
    htmlElement.classList.add("dark-mode");
  } else if (savedTheme === "light") {
    htmlElement.classList.remove("dark-mode");
  } else {
    // Check system preference if no saved preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      htmlElement.classList.add("dark-mode");
      localStorage.setItem("courseLibraryTheme", "dark");
    } else {
      localStorage.setItem("courseLibraryTheme", "light");
    }
  }
  updateToggleIcon();
}

// Setup theme toggle button listener
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

// Toggle theme
function toggleTheme() {
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.classList.contains("dark-mode");

  if (isDarkMode) {
    htmlElement.classList.remove("dark-mode");
    localStorage.setItem("courseLibraryTheme", "light");
  } else {
    htmlElement.classList.add("dark-mode");
    localStorage.setItem("courseLibraryTheme", "dark");
  }

  updateToggleIcon();
}

// Update theme toggle icon based on mode
function updateToggleIcon() {
  const themeToggle = document.getElementById("themeToggle");
  const isDarkMode = document.documentElement.classList.contains("dark-mode");
  if (themeToggle) {
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  setupThemeToggle();
});

// ==================== END NIGHT MODE FUNCTIONALITY ====================

const addCourseBtn = document.querySelector('.add-course-btn');
const addCourseModal = document.querySelector('.add-course-modal');
const closeAddCourseModal = document.querySelector('.close-modal-btn');
const submitAddCourse = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');
let courseGrid = document.querySelector('.course-grid');
const searchBtn = document.querySelector('.searchBtn');
const searchBar = document.querySelector('.search-input');
let allCourses = document.querySelectorAll('.course-card');

let course;

addCourseBtn.addEventListener('click',function(){
    addCourseModal.classList.add('active');
    
});

[closeAddCourseModal, cancelBtn].forEach(btn => btn.addEventListener('click',function(){
    addCourseModal.classList.remove('active');
}));

window.addEventListener('click',function(e){
    const addCourseModalContent = e.target.closest('.add-course-modal-content');
    const textOfAddButton = addCourseBtn.querySelector('.text-of-add');
    if(addCourseModalContent) return;
    if(e.target !== textOfAddButton && e.target !== addCourseBtn && addCourseModal.classList.contains('active')){
        addCourseModal.classList.remove('active');
    }
});

submitAddCourse.addEventListener('click',function(e){
    e.preventDefault();
    document.querySelector('.add-course-modal-content').scrollTop = 0;
    const title = document.querySelector('#courseTitle');
    const category = document.querySelector('#courseCategory');
    const difficulty = document.querySelector('#courseDifficulty');
    const description = document.querySelector('#courseDescription');
    const tags = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(tag => tag.value);
    const categoryFilter = document.querySelector('#categoryFilter');
    const difficultyFilter = document.querySelector('#difficultyFilter');
    const tagsFilter = document.querySelector('#tagsFilter');

    if(!tags.length || !title.value.length || !category.value.length || !description.value.length || !difficulty.value.length) return;

    //new course added
    course = new Course(0,title.value,category.value,difficulty.value,'',description.value,'',tags);

    addCourseModal.classList.remove('active');

    let tagsString = '';
    tags.forEach(tag => {
        tagsString += `<span class="course-tag">${tag}</span>\n`;
    });

    courseGrid.innerHTML = '';
    searchBar.value = '';
    categoryFilter.value = '';
    difficultyFilter.value = '';
    tagsFilter.value = '';

    let html = '';
    allCourses.forEach(course => {
        html += '<div class="course-card" bis_skin_checked="1">\n';
        html += course.innerHTML;
        html += '</div>\n';
    });

    html += `
        <div class="course-card" bis_skin_checked="1">
            <div class="course-thumbnail" bis_skin_checked="1">💡</div>
            <div class="course-content" bis_skin_checked="1">
                <h3 class="course-title">${title.value}</h3>
                <p class="course-description">${description.value}</p>
                <div class="course-difficulty ${difficulty.value.toLowerCase()}">${difficulty.value}</div>
                <div class="course-category ${category.value.toLowerCase()}">${category.value}</div>
                <div class="course-tags" bis_skin_checked="1">
                    ${tagsString}
                </div>
            </div>
        </div>
    `;
    courseGrid.insertAdjacentHTML('afterbegin',html);
    allCourses = Array.from(document.querySelectorAll('.course-card'));
    
    title.value = '';
    description.value = '';
    category.value = '';
    difficulty.value = '';
    
    document.querySelectorAll('input[type="checkbox"]').forEach(tag => {
        tag.checked = false;
    });
});

searchBtn.addEventListener('click',function(){
    searchBar.focus();
});

searchBar.addEventListener('input',function(){
    //searching logic
    const input = searchBar.value;
    let html = '';
    if(!input.length){
        allCourses.forEach(course => {
            html += '<div class="course-card" bis_skin_checked="1">\n';
            html += course.innerHTML;
            html += '</div>\n';
        });
        courseGrid.innerHTML = '';
        courseGrid.insertAdjacentHTML('beforeend',html);
    } else{
        allCourses.forEach(course => {
            const title = course.querySelector('.course-title').textContent;
            if(title.toLowerCase().includes(input.toLowerCase())){
                html += '<div class="course-card" bis_skin_checked="1">\n';
                html += course.innerHTML;
                html += '</div>\n';
            }
        });
        courseGrid.innerHTML = '';
        courseGrid.insertAdjacentHTML('beforeend',html);
    }
});

[categoryFilter, difficultyFilter, tagsFilter].forEach(filter => filter.addEventListener('change',function(){
    let html =  '';
    const temp = [...allCourses];

    if(categoryFilter.value){
        for(let i=0 ; i<temp.length ; i++){
            if (!temp[i].querySelector(".course-category").classList.contains(categoryFilter.value.toLowerCase())) {
                temp.splice(i,1);
                i--;
            }
        }
    } 
    if(difficultyFilter.value){
        for(let i=0 ; i<temp.length ; i++){
            if (!temp[i].querySelector(".course-difficulty").classList.contains(difficultyFilter.value.toLowerCase())) {
                temp.splice(i,1);
                i--;
            }
        }
    } 
    if(tagsFilter.value){
        for(let i=0 ; i<temp.length ; i++){
            if (!temp[i].innerHTML.toLowerCase().includes(tagsFilter.value.toLowerCase())) {
                temp.splice(i,1);
                i--;
            }
        }
    }

    temp.forEach(course => {
        html += '<div class="course-card" bis_skin_checked="1">\n';
        html += course.innerHTML;
        html += '</div>\n';
    });

    courseGrid.innerHTML = '';
    courseGrid.insertAdjacentHTML('afterbegin',html);
}));
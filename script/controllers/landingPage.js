// Night Mode Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Load theme preference from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  htmlElement.classList.add("dark-mode");
}

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    if (htmlElement.classList.contains("dark-mode")) {
      htmlElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  });
}

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});

// Toggle custom study goal input
function toggleCustomGoal() {
  const select = document.getElementById("studyGoalSelect");
  const customGroup = document.getElementById("customGoalGroup");
  if (select.value === "custom") {
    customGroup.style.display = "block";
  } else {
    customGroup.style.display = "none";
  }
}

const images = Array.from(document.querySelectorAll(".carousel-image"));
let activeImage = 0;
const topLogin = document.querySelector("#topLogin");
const topSignUp = document.querySelector("#topSignUp");
const sideLogin = document.querySelector("#sideLogin");
const sideSignUp = document.querySelector("#sideSignUp");
const loginModal = document.querySelector("#loginModal");
const signUpModal = document.querySelector("#signupModal");
const closeLoginForm = loginModal.querySelector(".modal-close");
const closeSignUpForm = signUpModal.querySelector(".modal-close");
const switchToLogin = document.querySelector(".switchToLogin");
const switchToSignUp = document.querySelector(".switchToSignUp");
const submitSignUp = signUpModal.querySelector('.form-submit');
const submitLogin = loginModal.querySelector('.form-submit');
let overlay;

let loginInfo = {
    email : '',
    password : ''
};

let submitInfo = {
    fullName : '',
    email : '',
    password : '',
    studyGoal : 0,
    about : ''
};

window.addEventListener("click", function (e) {
  if (
    e.target === overlay ||
    e.target === closeLoginForm ||
    e.target === closeSignUpForm
  ) {
    overlay.style.display = "none";
    loginModal.classList.remove("modal-overlay");
    signUpModal.classList.remove("modal-overlay");
  }
});

const transitionImage = function () {
  setInterval(function () {
    images[activeImage].classList.remove("active");
    activeImage = (activeImage + 1) % 3;
    images[activeImage].classList.add("active");
  }, 3000);
};

transitionImage();

[topLogin, sideLogin, topSignUp, sideSignUp].forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn === topSignUp || btn === sideSignUp) {
      loginModal.classList.remove("modal-overlay");
      signUpModal.classList.add("modal-overlay");
    } else {
      loginModal.classList.add("modal-overlay");
      signUpModal.classList.remove("modal-overlay");
    }
    overlay = document.querySelector(".modal-overlay");
    overlay.style.display = "flex";
  })
);

switchToSignUp.addEventListener("click", function () {
  loginModal.classList.remove("modal-overlay");
  signUpModal.classList.add("modal-overlay");
  overlay = document.querySelector(".modal-overlay");
  overlay.style.display = "flex";
  signUpModal.querySelector(".modal-content").scrollTop = 0;
  loginModal.style.display = 'none';
});

switchToLogin.addEventListener("click", function () {
  loginModal.classList.add("modal-overlay");
  signUpModal.classList.remove("modal-overlay");
  overlay = document.querySelector(".modal-overlay");
  overlay.style.display = "flex";
  signUpModal.style.display = 'none';
});

submitLogin.addEventListener('click',function(){
    const email = loginModal.querySelector('input[type="email"]').value;
    const password = loginModal.querySelector('input[type="password"]').value;

    if(!email.length || !password.length) return;

    loginInfo.email = email;
    loginInfo.password = password;

    loginModal.classList.remove('modal-overlay');
    [topLogin, sideLogin, topSignUp, sideSignUp].forEach(btn => btn.style.display = "none");
});

submitSignUp.addEventListener('click',function(){
    const fullName = signUpModal.querySelector('input[type="text"]').value;
    const email = signUpModal.querySelector('input[type="email"]').value;
    const password = signUpModal.querySelector('input[type="password"]').value;
    const dailyStaticGoal = signUpModal.querySelector('#studyGoalSelect').value;
    const dailyCustomGoal = signUpModal.querySelector('#customMinutes').value;
    const about = signUpModal.querySelector('#aboutUser').value;
    let goalInMinutes = 0;

    
    if(!fullName.length || !email.length || !password.length || !dailyStaticGoal.length) return;
    if(dailyStaticGoal === 'custom'){
        if(!dailyCustomGoal.length) return;
        goalInMinutes = Number(dailyCustomGoal);
    } else goalInMinutes = Number(dailyStaticGoal);

    submitInfo.fullName = fullName;
    submitInfo.email = email;
    submitInfo.password = password;
    submitInfo.studyGoal = goalInMinutes;
    submitInfo.about = about;

    signUpModal.classList.remove('modal-overlay');
    [topLogin, sideLogin, topSignUp, sideSignUp].forEach(btn => btn.style.display = "none");
});
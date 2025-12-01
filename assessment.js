import Question from "./script/modules/questionClass.js";
import quiz from "./script/modules/quizClass.js";

// Array of questions
const questions = [
  "When learning something new, what helps you the most?",
  "What type of instructions do you understand best?",
  "In class, what keeps you engaged?",
  "When revising for an exam, what do you prefer?",
  "What distracts you the most while studying?",
  "When solving a difficult problem, you usually…",
  "In group projects, what role do you take?",
  "How fast do you prefer learning?",
  "What motivates you the most?",
  "What makes a lecture boring for you?",
  "When learning programming, what helps you the most?",
  "How do you like feedback?",
  "When learning math, what do you prefer?",
  "How do you remember things best?",
  "What frustrates you most in learning?",
];

// Array of descriptions for each question
const description = [
  "Choose the method that makes new topics easiest for you to understand.",
  "Select the type of instructions you find clearest.",
  "Pick the teaching style that keeps your attention the most.",
  "Choose the way you like to study for tests.",
  "Select the thing that usually breaks your focus.",
  "Choose what you naturally do first when stuck on a problem.",
  "Pick the role you are most comfortable doing in a team.",
  "Choose the learning speed that feels right for you.",
  "Select what makes you want to keep learning.",
  "Pick what usually makes classes uninteresting for you.",
  "Choose the method that helps you grasp coding concepts best.",
  "Select the type of feedback you find most useful.",
  "Choose the method that helps you best understand math topics.",
  "Pick how you usually memorize information.",
  "Choose what makes learning difficult or annoying for you.",
];

// 2D Array of options (4 options per question)
const options = [
  [
    "Diagrams, charts, or images",
    "Listening to explanations",
    "Reading notes or textbooks",
    "Trying it out hands-on",
  ],
  [
    "Written step-by-step instructions",
    "Someone explaining verbally",
    "Watching someone do it",
    "Figuring it out by experimenting",
  ],
  [
    "Slides, diagrams, animations",
    "Classroom discussions",
    "Detailed handouts",
    "Group activities or experiments",
  ],
  [
    "Highlighting important text",
    "Listening to recordings",
    "Writing summaries",
    "Practicing with exercises/labs",
  ],
  [
    "Visual clutter",
    "Noise",
    "Poorly written instructions",
    "Sitting in one place too long",
  ],
  [
    "Draw diagrams",
    "Talk through the problem",
    "Read more about it",
    "Experiment until it works",
  ],
  ["Designer (slides, visuals)", "Presenter", "Writer", "Hands-on implementer"],
  [
    "Very slow with deep understanding",
    "Medium pace with examples",
    "Fast with summaries",
    "Depends on topic",
  ],
  [
    "Seeing progress charts",
    "Hearing appreciation",
    "Checking tasks off a list",
    "Doing practical activities",
  ],
  ["No visuals", "No discussion", "No written notes", "No activities"],
  [
    "Flowcharts/diagrams",
    "Someone explaining logic",
    "Reading documentation",
    "Coding by yourself",
  ],
  [
    "Written feedback",
    "Verbal feedback",
    "Visual grading indicators",
    "Live demonstration of mistakes",
  ],
  [
    "Seeing graphical representations",
    "Listening to explanations",
    "Reading formulas",
    "Solving problems hands-on",
  ],
  ["By seeing them", "By hearing them", "By writing them", "By doing them"],
  [
    "Too many words, no pictures",
    "Too much silence",
    "Too many visuals, no text",
    "No chance to try it yourself",
  ],
];

const questionCard = document.querySelector('#questionCard');
const answers = document.querySelector('#answers');
const nextBtn = document.querySelector('#nextBtn');
const backBtn = document.querySelector('#backBtn');
const sideProgressBar = document.querySelector('#sideProgress');
const topProgressBar = document.querySelector('#topProgress');
const percentLabel = document.querySelector('#percentLabel');
const stepNumber = document.querySelector('#stepNum');
const totalSteps = document.querySelector('#stepTotal');
const nightMode = document.querySelector('#themeToggle');
const header = document.querySelector('header');
const mainTitle = document.querySelector('#mainTitle');
const steps = document.querySelector('.text-sm');
let isNightMode = false;

window.addEventListener('load',function(){
  quiz.reset();
  quiz.total_questions = 15;
  for(let i=0 ; i<quiz.total_questions ; i++){
    quiz.add_question(new Question(questions[i], options[i], 0, 0, description[i]));
  } 
  quiz.display_question(questionCard, answers, isNightMode);
  backBtn.disabled = false;

  stepNumber.textContent = quiz.current_question;
  totalSteps.textContent = quiz.total_questions;

  topProgressBar.style.width = `${((quiz.current_question)*100/quiz.total_questions).toFixed(0)}%`;
});

answers.addEventListener('click',function(e){
  const target = e.target.closest('.glass');
  
  if(!target) return;
  const siblings = Array.from(target.parentNode.children);
  siblings.forEach((sibling , index) => {
    if(sibling === target){
      quiz.questions[quiz.current_question-1].marked_option = index+1;
      // console.log(quiz.questions[quiz.current_question-1].marked_option);
    }
    if(isNightMode) sibling.style.opacity = "1";
    else sibling.style.border = "0px";
  });

  if(isNightMode) target.style.opacity = "0.5";
  else target.style.border = "1px solid black";
  
  nextBtn.disabled = false;
  nextBtn.style.opacity = '1';
});

nextBtn.addEventListener('click',function(){
  percentLabel.textContent = `${((quiz.current_question)*100/quiz.total_questions).toFixed(0)}%`;
  sideProgressBar.style.width = `${((quiz.current_question)*100/quiz.total_questions).toFixed(0)}%`;

  if(quiz.current_question !== quiz.total_questions){
    //next logic.....
    quiz.current_question++;
    quiz.display_question(questionCard, answers, isNightMode);

    if(quiz.questions[quiz.current_question-1].marked_option === 0){
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.5';
    }
    
    stepNumber.textContent = quiz.current_question;
    
    if(quiz.current_question === quiz.total_questions){
      nextBtn.textContent = 'Submit →';
    }

  } else{
    //submit logic.....
  }

  topProgressBar.style.width = `${((quiz.current_question)*100/quiz.total_questions).toFixed(0)}%`;
});

backBtn.addEventListener('click',function(){
  if(quiz.current_question !== 1){
    //back logic.....
    quiz.current_question--;
    quiz.display_question(questionCard, answers, isNightMode);

    nextBtn.textContent = 'Next →';
    
    stepNumber.textContent = quiz.current_question;
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
  }

  topProgressBar.style.width = `${((quiz.current_question)*100/quiz.total_questions).toFixed(0)}%`;
});

const toggleNightMode = function(){
  header.style.background = `linear-gradient(90deg, ${isNightMode ? '#19375aff' : 'white'}, ${isNightMode ? '#102238ff' : 'white'})`;
  document.body.style.background = `linear-gradient(90deg, ${isNightMode ? '#19375aff' : 'white'}, ${isNightMode ? '#102238ff' : 'white'})`;
  questionCard.style.backgroundColor = `${isNightMode ? '#1a2957ff' : 'white'}`;
  mainTitle.style.color = `${isNightMode ? 'white' : 'black'}`;
  backBtn.style.background = `linear-gradient(90deg, ${isNightMode ? 'var(--primary)' : 'white'} , ${isNightMode ? '#23597f' : 'white'})`;
  backBtn.style.color = `${isNightMode ? 'white' : 'black'}`;
  steps.style.color = `${isNightMode ? 'white' : 'rgb(100 116 139 / var(--tw-text-opacity, 1))'}`;
  nightMode.textContent = `${isNightMode ? '☀️' : '🌙'}`;
  topProgressBar.parentNode.style.border = `${isNightMode ? '1px solid gray' : '0px'}`;
  topProgressBar.parentNode.style.backgroundColor = `${isNightMode ? 'rgba(255,255,255,0.5)' : 'rgba(29, 71, 105, 0.08)'}`;
  quiz.display_question(questionCard, answers, isNightMode);
}

nightMode.addEventListener('click',function(){
  isNightMode = !isNightMode;
  toggleNightMode();
});
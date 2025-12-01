class Quiz{
    questions = [];
    current_question;
    correct_answers;
    total_questions;
    wrong_answers;

    constructor(){
        this.current_question = 1;
        this.correct_answers = 0;
        this.wrong_answers = 0;
    }

    add_question(question){
        this.questions.push(question);
    }

    get_current_question(){
        return this.current_question;
    }

    get_total_questions(){
        return this.total_questions;
    }

    get_correct_answers(){
        return this.correct_answers;
    }

    get_wrong_answers(){
        return this.wrong_answers;
    }

    reset(){
        this.current_question = 1;
        this.correct_answers = 0;
        this.total_questions = 0;
        this.wrong_answers = 0;
        this.questions = [];
    }

    display_question(questionCard , answers, isNightMode){
        const question_no = this.current_question-1;

        questionCard.innerHTML = '';
        let html = `
            <div class="flex items-start justify-between">
                <div>
                    <div class="text-sm text-slate-500" style = "color: ${isNightMode ? 'white' : 'rgb(100 116 139 / var(--tw-text-opacity, 1))'}">Question <span id="qIndex">${this.current_question}</span> / <span id="qTotal">${this.total_questions}
                    </span></div>
                    <h2 id="qText" class="text-2xl font-semibold mt-2" style = "color: ${isNightMode ? 'white' : 'black'}">${this.questions[question_no].question}</h2>
                    <p id="qHint" class="text-sm text-slate-400 mt-2">${this.questions[question_no].description_of_question}</p>
                </div>
                <div id="iconWrap" class="text-3xl opacity-80">🧠</div>
            </div>
        `;
        questionCard.insertAdjacentHTML('afterbegin',html);

        answers.innerHTML = '';
        html = `
            <div class="grid gap-3 md:grid-cols-2" style = "color: ${isNightMode ? 'white' : 'black'}">
                <button class="glass p-4 rounded-lg text-left hover:scale-[1.01] transition-transform" style = "background-color: ${isNightMode ? '#1a2957ff' : 'white'}">
                    <div class="flex items-center justify-between">
                        <div>${this.questions[question_no].options[0]}</div>
                        <div class="opacity-0 check">✔️</div>
                    </div>
                </button>

                <button class="glass p-4 rounded-lg text-left hover:scale-[1.01] transition-transform" style = "background-color: ${isNightMode ? '#1a2957ff' : 'white'}">
                    <div class="flex items-center justify-between">
                        <div>${this.questions[question_no].options[1]}</div>
                        <div class="opacity-0 check">✔️</div>
                    </div>
                </button>

                <button class="glass p-4 rounded-lg text-left hover:scale-[1.01] transition-transform" style = "background-color: ${isNightMode ? '#1a2957ff' : 'white'}">
                    <div class="flex items-center justify-between">
                        <div>${this.questions[question_no].options[2]}</div>
                        <div class="opacity-0 check">✔️</div>
                    </div>
                </button>

                <button class="glass p-4 rounded-lg text-left hover:scale-[1.01] transition-transform" style = "background-color: ${isNightMode ? '#1a2957ff' : 'white'}">
                    <div class="flex items-center justify-between">
                        <div>${this.questions[question_no].options[3]}</div>
                        <div class="opacity-0 check">✔️</div>
                    </div>
                </button>
            </div>
        `;
        answers.insertAdjacentHTML('afterbegin',html);

        const marked = this.questions[question_no].marked_option;
        if(marked !== 0){
            const options = Array.from(answers.querySelectorAll('.glass'));
            if(isNightMode) options[marked-1].style.opacity = "0.5";
            else options[marked-1].style.border = "1px solid black";
        }        
    }

    check_answer(question_no = 0){
        const marked = this.questions[question_no].marked_option;
        const correct = this.questions[question_no].correct_option;
        if(marked === correct) this.correct_answers++;
        else this.wrong_answers++;
    }

    show_and_save_result(){
        
    }
}

export default new Quiz();
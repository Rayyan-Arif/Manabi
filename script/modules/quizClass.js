class Quiz{
    questions = [];
    current_question;
    correct_answers;
    total_questions;
    wrong_answers;

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

    display_question(question_no){

    }

    check_answer(question_no){

    }

    show_and_save_result(){
        
    }
}
class Question {
    question = "";
    options = [];
    correct_option;
    marked_option;
    description_of_question = "";

    constructor(question, options, correct, marked, description){
        this.question = question;
        this.options = options;
        this.correct_option = correct;
        this.marked_option = marked;
        this.description_of_question = description;
    }

    set_question_details(question, options, correct, marked, description){
        this.question = question;
        this.options = options;
        this.correct_option = correct;
        this.marked_option = marked;
        this.description_of_question = description;
    }

    get_question(){
        return this.question;
    }

    get_options(){
        return this.options;
    }

    get_correct_option(){
        return this.correct_option;
    }

    get_marked_option(){
        return this.marked_option;
    }

    get_description(){
        return this.description_of_question;
    }
}

export default Question;
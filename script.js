function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        if(quiz.score>3){
            showScoresWon();
        }
        else {
            showScoresLose();
        }
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScoresWon() {
    var gameOverHTML = "<h1>Welcome to the Desert of The Real!</h1>";
    gameOverHTML += "<h2 id='score'> YOUR SCORE: " + quiz.score + "</h2>";
    gameOverHTML += "<img src='neow.gif' alt='Bullet Stop'>";
    gameOverHTML += "<h3>This is your last chance. After this, there is no turning back. You take the red pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the blue pill - you stay in Wonderland and I show you how deep the rabbit-hole goes.</h3>";
    gameOverHTML += "<div class='btn'><button id='btnRetry' onclick='window.location.reload()'>AGAIN!</button><button id='btnExit' onclick='window.close()'>BUH-BYE!</button>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showScoresLose() {
    var gameOverHTML = "<h1>Sorry, Your Destiny is tied to the Matrix.</h1>";
    gameOverHTML += "<h2 id='score'> YOUR SCORE: " + quiz.score + "</h2>";
    gameOverHTML += "<img src='neol.gif' alt='Smith Cry'>";
    gameOverHTML += "<h3>This is your last chance. After this, there is no turning back. You take the red pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the blue pill - you stay in Wonderland and I show you how deep the rabbit-hole goes.</h3>";
    gameOverHTML += "<div class='btn'><button id='btnRetry' onclick='window.location.reload()'>AGAIN!</button><button id='btnExit' onclick='window.close()'>BUH-BYE!</button>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// The Question and The Answers
var questions = [
    new Question("Neo is an anagram for ____.", ["You", "Uno", "Mr. Anderson", "One"], "One"),
    new Question("What are the Agents?", ["Sentient Peacekeeping Programs", "Cool Dudes", "Your Insurance Agent", "Random Strangers"], "Sentient Peacekeeping Programs"),
    new Question("What is the name of the ship that Morpheus captains?", ["Titanic", "Cortlandt","Nebuchadnezzar", "Jenny"], "Nebuchadnezzar"),
    new Question("Who did the bullet-time first?", ["The Keymaker", "Merovingian", "Trinity", "Seraph"], "Trinity"),
    new Question("The Matrix was inspired by ____.", ["Inception", "Ghost in the Shell", "Tron", "Transformers"], "Ghost in the Shell")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();
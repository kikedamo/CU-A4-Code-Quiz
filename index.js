const BtnOne = document.getElementById("BtnOne");
const BtnTwo = document.getElementById("BtnTwo");
const BtnThree = document.getElementById("BtnThree");
const BtnFour = document.getElementById("BtnFour");
const Start = document.getElementById("StartBtn");
const Next = document.getElementById("NextBtn");
const Quest = document.getElementById("Question");
const BtnAll = document.getElementById("Buttons");
const web = document.getElementById("WholeSite");
const QuestionArea = document.getElementById("QuestionArea")
const Btn = document.getElementsByClassName("Btn")

let CurrentQuestionIndex = -1

Start.addEventListener("click", StartGame);
Next.addEventListener("click", NextQuestion);
	// BtnOne.addEventListener("click", )
	// BtnTwo.addEventListener("click", )
	// BtnThree.addEventListener("click", )
	// BtnFour.addEventListener("click", )

function StartGame() {
	console.log("Game Started");
	Start.classList.add("Hide");
	Quest.classList.remove("Hide");
	BtnAll.classList.remove("Hide");
	Next.classList.remove("Hide");
	NextQuestion();
}

function NextQuestion() {
	ResetQuestion()
	CurrentQuestionIndex++;
	ShowQuestion();
}

function ShowQuestion() {
	let currentQuestion = QuestionsAll[CurrentQuestionIndex];
	console.log("question number",CurrentQuestionIndex+1)
	Quest.innerHTML = currentQuestion.Question;
	currentQuestion.Answers.forEach(Answer =>{
		const BtnTag = document.createElement("button");
		BtnTag.innerHTML = Answer.text;
		BtnTag.classList.add("Btn");
		if (Answer.correct){
			BtnTag.dataset.correct = Answer.correct;
		}
		BtnTag.addEventListener("click", SelectAnswer)
		BtnAll.appendChild(BtnTag);
	});
}


function SelectAnswer() {

}

function ResetQuestion(){
	BtnAll.removeChild(Btn)

}

const QuestionsAll = [
    {
        Question: "What's 1+1?",
        Answers: [{
            text: "1",
            correct: false
        }, {
            text: "2",
            correct: true
        }, {
            text: "3",
            correct: false
        }, {
            text: "4",
            correct: false
        }, ]
    },
    {
        Question: "What's 2+2?",
        Answers: [{
            text: "1",
            correct: false
        }, {
            text: "2",
            correct: false
        }, {
            text: "3",
            correct: false
        }, {
            text: "4",
            correct: true
        }, ],
    },
    {
        Question: "What's 2-1?",
        Answers: [{
            text: "1",
            correct: false
        }, {
            text: "2",
            correct: false
        }, {
            text: "3",
            correct: true
        }, {
            text: "4",
            correct: false
        }, ],
    },
    {
        Question: "What's 2+0?",
        Answers: [{
            text: "1",
            correct: false
        }, {
            text: "2",
            correct: true
        }, {
            text: "3",
            correct: false
        }, {
            text: "4",
            correct: false
        }, ],
    },
    {
        Question: "What's 1+2?",
        Answers: [{
            text: "1",
            correct: false
        }, {
            text: "2",
            correct: false
        }, {
            text: "3",
            correct: true
        }, {
            text: "4",
            correct: false
        }, ],
    },
]
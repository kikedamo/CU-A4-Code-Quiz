const BtnOne = document.getElementById("BtnOne");
const BtnTwo = document.getElementById("BtnTwo");
const BtnThree = document.getElementById("BtnThree");
const BtnFour = document.getElementById("BtnFour");
const Start = document.getElementById("StartBtn");
const Next = document.getElementById("NextBtn");
const Quest = document.getElementById("Question");
const BtnAll = document.getElementById("Buttons");
const web = document.getElementById("WholeSite");

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
	ShowQuestion(Question);
}

function ShowQuestion(Question) {
	Quest.innerHTML = QuestionsAll.Question;
}

function SelectAnswer() {

}

const QuestionsAll = [{
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
	}, ],
}];